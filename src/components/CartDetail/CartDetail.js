import { useContext } from "react"
import { CartContext } from "../../context/CartContext/CartContext"
import { NavLink } from "react-router-dom"
import CartItem from "../CartItem/CartItem"

export default function Cart () {

    //Gets function from CartContext
    const {cart, totalPrice } = useContext(CartContext)

    return(
        <div className='cart-main-container'>

            {
                //If there are no products on Cart, shows message and button to go shopping products
    
                cart.length === 0 &&
                <>
                    <div className='empty-cart-container'>
                        <h2>Oops! Aún no has agregado productos a tu carrito.</h2>
                        <NavLink to='/category/0' className='add-cart-btn'>Ver productos</NavLink>
                    </div>
                </>
            }

            {
                //If Cart is not empty

                cart.length > 0 &&
                <>
                    <div className='cart-info-container'>
                      
                        <div className='cart-items'>
                            <h2>Tus productos</h2>
                            {
                                //Hacer Cart.map
                            
                                    cart.map((item, i) =>(
                                        <CartItem item={item} key={i}/>
                                    ))
                                
                            }

                        </div>
                        <div className='cart-details'>
                            <h2>Detalle Compra</h2>
                            <div className='cart-price-detail'>
                                <p>Total productos:</p>  
                                <p>${totalPrice()}</p>    
                            </div>
                            <div className='cart-price-detail'>
                                <p>Cargo envío:</p>  
                                <p>$0</p>    
                            </div>
                            <div className='cart-price-detail final-price'>
                                <p>Total compra:</p>  
                                <p>${totalPrice()}</p>    
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}