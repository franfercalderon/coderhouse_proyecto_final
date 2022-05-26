import { useState } from "react"
// import AddCartButton from "../AddCartButton/AddCartButton"

export default function ItemCount ({stock, initial, onAdd}) {

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
            {qty > 0 && <input type='button' onClick={()=>onAdd(qty)} value='Agregar al carrito' className='add-cart-btn'></input>}
        </>
    )

}