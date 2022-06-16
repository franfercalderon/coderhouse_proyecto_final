import { addDoc, collection, getFirestore, runTransaction, doc } from "firebase/firestore"
import { useState } from "react"
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
        
        //Object order gathering: data from checkout form, cart from cartContext and totalPrice from cartContext
        const order = {
            buyer: data,
            items: cart,
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
                    // !actualOrder &&
                    <>
                        <div className='checkout-form-container'>
                            <h2>Checkout</h2>
                            <form className='checkout-form' onSubmit={handleSumbit}>
                                <div className='checkout-group-container'>
                                    <input placeholder='Nombre' name='name'type='text' className='checkout-text-input' onChange={handleChange}/>
                                    <input placeholder='Apellido' name='lastname' type='text' className='checkout-text-input'onChange={handleChange}/>
                                </div>
                                <div className='checkout-group-container'>
                                    <input placeholder='Teléfono' name='phone' type='text' className='checkout-text-input'onChange={handleChange}/>
                                    <input placeholder='email' name='email' type='text' className='checkout-text-input'onChange={handleChange}/>
                                </div>
                                <div className='checkout-group-container'>
                                    <input placeholder='Domicilio' name='address' type='text' className='checkout-text-input'onChange={handleChange}/>
                                    <input placeholder='Piso / Dpto' name='apt' type='text' className='checkout-text-input small-input'onChange={handleChange}/>
                                </div>
                                <div className='checkout-group-container'>
                                    <input placeholder='Ciudad' name='city' type='text' className='checkout-text-input'onChange={handleChange}/>
                                    <input placeholder='Código Postal' name='zipcode' type='text' className='checkout-text-input small-input'onChange={handleChange}/>
                                </div>
                                <input type='submit' className='checkout-btn' value='Comprar'/>
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
