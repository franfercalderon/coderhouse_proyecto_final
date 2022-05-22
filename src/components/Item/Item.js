import { NavLink } from 'react-router-dom'
import AddCartButton from '../AddCartButton/AddCartButton'

export default function Item ({product}) {

 

    return(
        <>
            <NavLink to={`/product/${product.id}`} className='item-card'>
                <div className='item-card-img-container'>
                    <img src={product.picture} alt={product.title}/>
                </div>
                <h2>{product.title}</h2>
                <AddCartButton/>
                {/* <input type='button' value='Agregar al Carrito'></input> */}
            </NavLink>
        </>

    )
}