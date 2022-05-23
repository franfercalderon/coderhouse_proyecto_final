import { useState } from "react"
import AddCartButton from "../AddCartButton/AddCartButton"
import ItemCount from "../ItemCount/ItemCount"


export default function ItemDetail ({product}) {

    //Initial state for Item selected Quantity
    const [qty, setQty] = useState(0)


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
            <ItemCount qty={qty} setQty={setQty} stock={product.stock}/>
            {qty > 0 && <AddCartButton />}
            
        </div>
    </div>

)

}