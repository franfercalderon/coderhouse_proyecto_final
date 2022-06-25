import ItemDetail from "../ItemDetail/ItemDetail"
import { useEffect, useState } from "react"
import { getFirestore, getDoc, doc} from 'firebase/firestore'
import Loader from "../Loader/Loader"
import NotFound from "../NotFound/NotFound"

export default function ItemDetailContainer ({productId}) {

    //States
    const [product, setProduct] = useState({})
    const [isLoading, setIsLoading] = useState()
    const [success, setSuccess] = useState(false)

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
                
                //Runs exists() function to check if doc was found
                if(!snapshot.exists()){

                    //Sets state to show 'NotFound' page
                    setIsLoading(false)
                    setSuccess(false)
                }
                else{
                    
                    const item = {
                        id: snapshot.id,
                        ...snapshot.data()
                    }

                    //Sets item and success to true
                    setProduct(item)
                    setSuccess(true)
                }
            })
            .finally(()=>{
                setIsLoading(false)
            })

    },[productId])


    return(
        <>
            {
                //Shows loader if neccesary
                isLoading &&
                <Loader/>
            }
            {
                !isLoading &&
                <>
                    {
                        //If an item was set (according success state)
                        success &&
                        <ItemDetail product={product}/>
                    }
                    {
                        //If item was not found (according to success state)
                        !success &&
                        <NotFound title='Oops! Parece que este producto no existe.' btn='Ir al Home'/>
                    }
                </>
            }
        </>
    )


}