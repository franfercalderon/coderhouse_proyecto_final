import { NavLink } from "react-router-dom"

export default function Nav () {

    <div className='nav-bar-container'>
        <NavLink to='/'>
            <div className='nav-logo-container'>
                <img src='/images/logo'className="nav-logo"/>
            </div>
        </NavLink>
        <div className='nav-category-container'>
            <NavLink to='/category/1'>MOCHILAS</NavLink>
            <NavLink to='/category/2'>RIÑONERAS</NavLink>
            <NavLink to='/category/3'>BILLETERAS</NavLink>
        </div>
        <NavLink to='/'>
            <div className='nav-cart-container'>
                <img src='/images/cart'className="nav-cart"/>
            </div>
        </NavLink>
    </div>

}