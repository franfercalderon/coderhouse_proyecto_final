// import Cart from "../../views/Cart/Cart";
import { useContext } from "react"
import { CartContext } from "../../context/CartContext/CartContext"

export default function CartWidget (){

    const {cart} = useContext(CartContext)
    return(
        <div className='nav-cart-container'>
            <img src='/images/icons/basket.png'className="nav-cart" alt='cart icon'/>
            {cart.length>0 && 
                <div className='nav-cart-badge'>
                    <p>{cart.length}</p>
                </div>
            }
        </div>
    )
}

