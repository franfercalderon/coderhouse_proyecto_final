export default function ItemCount ({qty, setQty, stock}) {

    //Functions to add and remove items from selected quantity

    const handleRemove = () => {

        if(qty>0){
            setQty(qty-1)
        }
    }

    const handleAdd = () => {

        if(qty < stock){
            setQty(qty+1)
        }

    }

    return(
        <div className='item-count-container'>
            <input type='button' value='-' className='item-count-btn' onClick={handleRemove}></input>
            <div className='item-count-display'>
                <p>{qty}</p>
            </div>
            <input type='button' value='+' className='item-count-btn' onClick={handleAdd}></input>
        </div>
    )

}