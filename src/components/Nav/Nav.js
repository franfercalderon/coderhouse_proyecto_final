import { NavLink } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"

export default function Nav () {

    return(

        <div className='nav-bar-container'>
            <NavLink to='/'>
                <div className='nav-logo-container'>
                    <img src='/images/logo.png' className="nav-logo" alt='Herschel Logo'/>
                </div>
            </NavLink>
            <div className='nav-category-container'>
                <NavLink to='/category/0' className='nav-link'>TODO</NavLink>
                <NavLink to='/category/2' className='nav-link'>MOCHILAS</NavLink>
                <NavLink to='/category/3' className='nav-link'>RIÑONERAS</NavLink>
                <NavLink to='/category/1' className='nav-link'>BILLETERAS</NavLink>
            </div>
            <NavLink to='/cart'>
                <CartWidget/>
                {/* <div className='nav-cart-container'>
                    <img src='/images/icons/basket.png'className="nav-cart" alt='cart icon'/>
                </div> */}
            </NavLink>
        </div>
    )
    
}