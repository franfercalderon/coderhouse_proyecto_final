import { useContext } from "react"
import { CartContext } from "../../context/CartContext/CartContext"

export default function CartWidget (){

    //Gets cart and cartQty from context
    const {cart, cartQty} = useContext(CartContext)


    //If there are items on cart, shows badge showing quantity of added items
    return(
        <div className='nav-cart-container'>
            <img src='/images/icons/basket.png'className="nav-cart" alt='cart icon'/>
            {cart.length > 0 && 
                <div className='nav-cart-badge'>
                    <p>{cartQty()}</p>
                </div>
            }
        </div>
    )
}

