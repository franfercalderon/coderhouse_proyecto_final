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
                <NavLink to='/category/backpacks' className='nav-link'>MOCHILAS</NavLink>
                <NavLink to='/category/hipbags' className='nav-link'>RIÑONERAS</NavLink>
                <NavLink to='/category/wallets' className='nav-link'>BILLETERAS</NavLink>
            </div>
            <NavLink to='/cart'>
                <CartWidget/>
            </NavLink>
        </div>
    )
    
}