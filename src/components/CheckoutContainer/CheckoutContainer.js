import { addDoc, collection, getFirestore } from "firebase/firestore"
import { useState } from "react"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext/CartContext"
import Loader from "../Loader/Loader"
import { NavLink } from "react-router-dom"



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
            })
            .finally(() => {

                //Sets state to show checkout success and empties cart
                setOrderComplete(true)
                setIsLoading(false)
                emptyCart()
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
                            <NavLink to='/' className='add-cart-btn checkout'>Volver al Home</NavLink>

                        </div>
                    </>
                }
                
            </div>

        }
        </>

    )
}
