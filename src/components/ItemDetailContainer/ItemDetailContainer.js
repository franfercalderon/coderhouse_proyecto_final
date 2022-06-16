import ItemDetail from "../ItemDetail/ItemDetail"
import { useEffect, useState } from "react"
import { getFirestore, getDoc, doc} from 'firebase/firestore'
import Loader from "../Loader/Loader"

export default function ItemDetailContainer ({productId}) {

    //States
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState()

    useEffect(()=>{

        //RUNS EVERY TIME PRODUCT ID IS UPDATED.
        
        //Sets loader
        setIsLoading(true)

        //Calls Firestore
        const db = getFirestore()

        //Gets doc using item id and sets item as state
        const itemRef = doc(db, 'products', productId)
        getDoc(itemRef)
            .then(snapshot =>{
                const item = {
                    id: snapshot.id,
                    ...snapshot.data()
                }
                setProduct(item)
            })
            .finally(()=>{
                setIsLoading(false)
            })

    },[productId])

    return isLoading? (
        <Loader/>
    ):(
        <ItemDetail product={product}/>
    )


}