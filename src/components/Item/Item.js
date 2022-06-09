import { NavLink } from 'react-router-dom'

export default function Item ({product}) {

    return(
        <>
            <NavLink to={`/product/${product.id}`} className='item-card'>
                <div className='item-card-img-container'>
                    <img src={product.picture} alt={product.title}/>
                </div>
                <h2>{product.title}</h2>
            </NavLink>
        </>

    )
}