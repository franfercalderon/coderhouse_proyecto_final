import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";
import { getFirestore, collection, getDocs, query, where} from 'firebase/firestore'
import NotFound from "../NotFound/NotFound";

export default function ItemsListContainer ({categoryId} ) {
    
    const [array, setArray] = useState([])
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(()=>{

        //This runs every time categoryId is updated

        //Inits setting Loader
        setIsLoading(true)

        //Calls Firestore
        const db = getFirestore()

        if(categoryId){

            //If a category id is received on params, gets products matching categoryId
            const qProductsyRef = query(collection(db,'products'),where('categoryId', '==', categoryId ))

            getDocs(qProductsyRef)
                .then( snapshot => {
                    if(snapshot.size === 0){

                        //Sets state to show 'NotFound' page
                        setIsLoading(false)
                        setSuccess(false)
    
                    }
                    else{
                        //Creates array 'data' from info received
                        const data = snapshot.docs.map(
                            doc => ({
                                id: doc.id,
                                ...doc.data()
                            })
                        )
                        //Sets state of array using fetched data and success to true
                        setArray(data)
                        setSuccess(true)

                    }

                    //Gets selected category from category collection 
                    const qCategoryRef = query(collection(db,'categories'),where('categoryId', '==', categoryId ))
                    getDocs(qCategoryRef)
                        .then(snapshot=>{
                            if(snapshot.size===0){

                                //Sets state to show 'NotFound' page
                                setIsLoading(false)
                                setSuccess(false)
                            }
                            else{

                                //If a collection was found
                                const data = snapshot.docs.map(
                                    doc =>({
                                        ...doc.data()
                                    })
                                )
                                //Sets title from category
                                setTitle(data[0].title)
                            }
                        })
                        .finally(()=>{
                            setIsLoading(false)
                        })
                })
        }
        else{

            //Shows all categories/products
            const productsRef = collection(db, 'products')
            getDocs(productsRef)
                .then( snapshot => {
                    if(snapshot.size === 0 ){
                        
                       //Sets state to show 'NotFound' page
                        setIsLoading(false)
                        setSuccess(false)
                    }
                    else{
                        const data = snapshot.docs.map(
                            doc => ({
                                id: doc.id,
                                ...doc.data()
                            })
                        )

                        //Sets array with info and success to true
                        setArray(data)
                        setSuccess(true)
                    }
                })
                .finally(()=>{
                    setIsLoading(false)
                })
        }
    },[categoryId])
    

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
                        //If a category has been found (checks it through 'success' state)
                        success &&
                            <div className='item-list-container'>
                                <div className='item-list-container-title'>
                                    <h1>{title.toUpperCase()}</h1>
                                </div>
                                <ItemList products={array}/>
                            </div>
                    }
                    {
                        //If there is no category, shows NotFound component with proper message
                        !success &&

                        <NotFound title='Oops! No encontramos esta categoría.' btn='Ir al Home'/>

                    }
                </>
            }
        </>
    )
}