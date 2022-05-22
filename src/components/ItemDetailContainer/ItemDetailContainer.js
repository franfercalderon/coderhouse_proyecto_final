import ItemDetail from "../ItemDetail/ItemDetail"
import { products } from "../../data/products"
import { useEffect, useState } from "react"

export default function ItemDetailContainer ({productId}) {

    const [product, setProduct] = useState({})

    useEffect(()=>{
        
        //Finds the product matching productId
        const item =products.find(product => product.id === +productId)
        setProduct(item)

    },[productId])

    return(

        <ItemDetail product={product}/>

    )


}