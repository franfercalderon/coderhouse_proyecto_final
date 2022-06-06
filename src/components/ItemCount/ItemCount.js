import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function ItemCount ({stock, initial, onAdd, added}) {

     //Initial state for Item selected Quantity
     const [qty, setQty] = useState(initial)

    //Functions to add and remove items from selected quantity
    const handleRemove = () => {
        if(qty > 0){
            setQty(qty-1)
        }
    }

    const handleAdd = () => {
        if(qty < stock){
            setQty(qty+1)
        }
    }

    return(
        <>
            <div className='item-count-container'>
                <input type='button' value='-' className='item-count-btn' onClick={handleRemove}></input>
                <div className='item-count-display'>
                    <p>{qty}</p>
                </div>
                <input type='button' value='+' className='item-count-btn' onClick={handleAdd}></input>
            </div>
            {
                !added ?
                 <input type='button' onClick={()=>onAdd(qty)} value='Agregar al carrito' className='add-cart-btn'></input> 
                :
                <NavLink to='/cart'>
                    <input type='button' value='Terminar compra' className='go-cart-btn'></input>
                </NavLink>
                
            }
        </>
    )

}