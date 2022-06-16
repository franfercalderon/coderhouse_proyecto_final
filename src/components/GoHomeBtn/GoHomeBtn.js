import { NavLink } from "react-router-dom"

export default function GoHomeBtn ({title}) {
    
    return(
        <>
            <NavLink to='/' className='add-cart-btn'>{title}</NavLink>
        </>
    )
}