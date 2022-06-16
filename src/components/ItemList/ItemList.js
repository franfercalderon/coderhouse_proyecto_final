import { useEffect, useState } from 'react'
import Item from '../Item/Item'

export default function ItemList ({products}) {


    //States
    const [array, setArray] = useState([])

    useEffect(()=>{

        //Updates array of products each time "products" changes
        setArray(products)

    },[products])

    return(
        <div className='item-list'>
            {array.map((product, i) =>(
                <Item product={product} key={i}/>
            ))}
        </div>
    )
}