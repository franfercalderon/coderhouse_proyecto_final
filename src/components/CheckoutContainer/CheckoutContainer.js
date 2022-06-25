import { addDoc, collection, getFirestore, runTransaction, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext/CartContext"
import Loader from "../Loader/Loader"
import GoHomeBtn from "../GoHomeBtn/GoHomeBtn"




export default function CheckoutContainer (){

    //Gets function from CartContext
    const {cart, totalPrice, emptyCart} = useContext(CartContext)

    //States
    const [data, setData] = useState({})
    const [actualOrder, setActualOrder] = useState({})
    const [orderComplete, setOrderComplete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [emails, setEmails] = useState([])

    //Functions

    const handleChange = (e) =>{

        //Gets values from form elements and sets data
        const {name, value} = e.target
        setData({...data, [name]: value})
    }

    const handleSumbit = async (e) => {

        //Set loader
        setIsLoading(true)

        //Prevents default submit behaviour
        e.preventDefault()

        //Creates date string in UTC
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed)
        const UTCdate = today.toUTCString()
        
        //Object order gathering: data from checkout form, cart from cartContext and totalPrice from cartContext
        const order = {
            buyer: data,
            items: cart,
            status: 'placed',
            date: UTCdate,
            total: totalPrice()
        }

        //Gets Firestore reference and creates order collection.
        const db = getFirestore()
        const ordersCollection = collection(db, 'orders')
        await addDoc(ordersCollection, order)
            .then( ({id}) => {

                // Sets state with order including it's id
                setActualOrder({
                    id: id,
                    ...order
                })

                //Updates actual stock in Firestore
                updateProductStock()
            })
            .finally(() => {

                //Sets state to show checkout success and empties cart
                setOrderComplete(true)
                setIsLoading(false)
                emptyCart()
            })
    }

    const updateProductStock = async () =>{

        const db = getFirestore()

        //Maps cart and
        cart.forEach( async (item) =>{

            //References each item using its id
            const itemRef = doc(db, 'products', item.id)
            
            await runTransaction(db, async (transaction) =>{

                //Gets transaction doc
                const transDoc = await transaction.get(itemRef)

                
                if (!transDoc.exists()){

                    //Logs error if no doc is found
                    console.error('Document was not found')
                }
                else{

                    //If there's a doc matching the id, creates new stock and updates item's transaction
                    const newStock = transDoc.data().stock - item.quantity
                    transaction.update(itemRef, {stock: newStock})
                }

            })
        })
    }

    const getEmails = (e) => {

        //Gets emails from inputs
        setEmails({
            ...emails,
            [e.target.name] : e.target.value
        })

    }

    useEffect(()=>{
        
        //This executes whenever emails state changes 

        if(emails.email1 && emails.email2){

            //If there's something on email inputs, sets setValidEmail to true
            if(emails.email1 === emails.email2){
                setValidEmail(true)
            }
        }
    },[emails])
    
    return(

        <> 
        {
            //Shows loader if neccesary
            isLoading &&
            <Loader/>
        }
        {

            !isLoading &&
            <div className='checkout-main-container'>   
                {   
                    //If orderId is empty, shows form.
                    !orderComplete &&
                    <>
                        <div className='checkout-form-container'>
                            <h2>Checkout</h2>
                            <form className='checkout-form' onSubmit={handleSumbit}>
                                <h3>Datos de contacto</h3>
                                <div className='checkout-group-container'>
                                    <input placeholder='Nombre y Apellido' name='name'type='text' className='checkout-text-input' onChange={handleChange}/>
                                    <input placeholder='Teléfono' name='phone' type='text' className='checkout-text-input'onChange={handleChange}/>
                                </div>
                                <h3>Datos para tu envío</h3>
                                <div className='checkout-group-container'>
                                    <input placeholder='Domicilio' name='address' type='text' className='checkout-text-input'onChange={handleChange}/>
                                    <input placeholder='Piso / Dpto' name='apt' type='text' className='checkout-text-input small-input'onChange={handleChange}/>
                                </div>
                                <div className='checkout-group-container'>
                                    <input placeholder='Ciudad' name='city' type='text' className='checkout-text-input'onChange={handleChange}/>
                                    <input placeholder='Código Postal' name='zipcode' type='text' className='checkout-text-input small-input'onChange={handleChange}/>
                                </div>
                                <h3>Por último, verifica tu correo</h3>
                                <div className='checkout-group-container'>
                                    <input placeholder='email' name='email1' type='text' className='checkout-text-input'onChange={(e)=>{handleChange(e); getEmails(e)}}/>
                                    <input placeholder='Verifica tu email' name='email2' type='text' className='checkout-text-input'onChange={(e)=>{handleChange(e); getEmails(e)}}/>
                                </div>
                                {
                                    //Shows Sumbit button only once emails match
                                    validEmail &&
                                    <input type='submit' className='checkout-btn' value='Comprar'/>
                                }
                            </form>

                        </div>
                    </>
                }
                {
                    //If there is there is an orderId, shows order success info
                    orderComplete &&
                    <>
                        <div className='checkout-form-container'>
                            <h2>¡Felicitaciones! Tu compra ha sido realizada.</h2>
                            <div className='checkout-success-container'>
                                <p>Orden: <span>{actualOrder.id}</span></p>
                                <p>Tu correo electrónico: <span>{actualOrder.buyer.email1}</span></p>
                                <p>Domicilio de entrega: <span>{actualOrder.buyer.address}</span> / <span>{actualOrder.buyer.apt}, </span><span>{actualOrder.buyer.city} <span>({actualOrder.buyer.zipcode}) </span> </span></p>
                                <p>Total compra: <span>$ {actualOrder.total}</span></p>
                            </div>
                            <GoHomeBtn title='Volver al Home'/>
                        </div>
                    </>
                }
                
            </div>

        }
        </>

    )
}
