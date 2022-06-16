import { useContext } from "react"
import { CartContext } from "../../context/CartContext/CartContext"
import { NavLink } from "react-router-dom"
import CartItem from "../CartItem/CartItem"
import GoHomeBtn from '../GoHomeBtn/GoHomeBtn'

export default function Cart () {

    //Gets function from CartContext
    const {cart, totalPrice, emptyCart } = useContext(CartContext)

    return(
        <div className='cart-main-container'>
            {
                //If there are no products on Cart, shows message and button to go shopping products
                cart.length === 0 &&
                <>
                    <div className='empty-cart-container'>
                        <h2>Oops! Aún no has agregado productos a tu carrito.</h2>
                        <GoHomeBtn title='Ir a comprar!'/>
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
                                //Maps cart and returns an item for each product (no matter the quantity)
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
                            <div className='cart-details-btn-container'>
                                <input type='button' value='Vaciar carrito' className='cart-details-btn empty'onClick={emptyCart}/>
                                <NavLink to='/checkout' className='cart-details-btn buy'>Comprar</NavLink>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}