import { NavLink } from "react-router-dom"

export default function AddCartButton () {
    return(

        <>
            <NavLink to='/cart' className='add-cart-btn'>Agregar al Carrito</NavLink>
        </>


        // <input type='button' value='Agregar al Carrito'></input>
    )
}