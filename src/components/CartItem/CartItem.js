import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan} from '@fortawesome/free-regular-svg-icons'
import { useContext } from "react"
import { CartContext } from "../../context/CartContext/CartContext"

export default function CartItem ({item}) {

    //Gets function from CartContext
    const {removeFromCart} = useContext(CartContext)

    return(
        <div className='cart-item-container'>
            <div className='cart-item-img-container'>
                <img src={item.picture} alt={item.title}></img>
            </div>
            <div className='cart-item-details'>
                <h3>{item.title}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio por unidad: ${item.price}</p>
            </div>
            <button className='delete-from-cart-btn' onClick={()=>removeFromCart(item)}>
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        </div>
    )
}