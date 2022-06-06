// import AddCartButton from "../AddCartButton/AddCartButton"
import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext/CartContext"
import ItemCount from "../ItemCount/ItemCount"



export default function ItemDetail ({product}) {

    // //Initial state for Item selected Quantity
    const initial = 1

    //Gets function from CartContext
    const {addToCart} = useContext(CartContext)

    const [added, setAdded] = useState(false)

    const onAdd = (qty) => {

        //Calls fn from CartContext:
        addToCart(qty, product)
        setAdded(true)

    }


return(
    <div className="item-detail-main-container">
        <div className="item-detail-photo-container">
            <img src={product.picture} alt={product.title}/>
        </div>
        <div className="item-detail">
            <div className="item-detail-title-container">
                <h2>{product.title}</h2>
                <h3>{product.category}</h3>
            </div>
            <p className="item-detail-description">{product.description}
            </p>
            <p className="item-detail-price">$ {product.price}</p>
            <ItemCount stock={product.stock} initial={initial} onAdd={onAdd} added={added}/>
            {/* <AddCartButton onClick={()=>onAdd}/> */} 
            {/* {qty > 0 && <AddCartButton />} */}
            {/* {
                added &&

                <NavLink to='/cart'>
                    <input type='button' value='Terminar compra' className='go-cart-btn'></input>
                </NavLink>
            } */}

            
        </div>
    </div>

)

}