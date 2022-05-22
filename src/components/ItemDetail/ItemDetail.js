import AddCartButton from "../AddCartButton/AddCartButton"

export default function ItemDetail ({product}) {

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
            <AddCartButton/>
        </div>
    </div>

)

}