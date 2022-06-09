import ItemDetail from "../ItemDetail/ItemDetail"
import { products } from "../../data/products"
import { useEffect, useState } from "react"
import { getFirestore, getDoc, doc} from 'firebase/firestore'

export default function ItemDetailContainer ({productId}) {

    const [product, setProduct] = useState({})

    useEffect(()=>{
        
      
        //Calls Firestore
        const db = getFirestore()
        
        const itemRef = doc(db, 'products', productId)
        getDoc(itemRef)
            .then(snapshot =>{
                const item = {
                    id: snapshot.id,
                    ...snapshot.data()
                }
                setProduct(item)
            })

    },[productId])

    return(

        <ItemDetail product={product}/>

    )


}