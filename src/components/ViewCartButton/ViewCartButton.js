import { NavLink } from "react-router-dom"

export default function ViewCartButton () {
    return(

        <>
            <NavLink to='/cart' className='view-cart-btn'>Ir al Carrito</NavLink>
        </>
    )
}