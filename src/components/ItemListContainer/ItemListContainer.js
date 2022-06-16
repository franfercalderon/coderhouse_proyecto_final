import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";
import { getFirestore, collection, getDocs, query, where} from 'firebase/firestore'

export default function ItemsListContainer ({categoryId} ) {
    
    const [array, setArray] = useState([])
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
                        console.log('No results')
                    }
                    else{
                        //Creates array 'data' from info received
                        const data = snapshot.docs.map(
                            doc => ({
                                id: doc.id,
                                ...doc.data()
                            })
                        )
                        //Sets state of array using fetched data
                        setArray(data)
                    }

                    //Gets selected category from category collection 
                    const qCategoryRef = query(collection(db,'categories'),where('categoryId', '==', categoryId ))
                    getDocs(qCategoryRef)
                        .then(snapshot=>{
                            if(snapshot.size===0){
                                console.log('Category not found')
                            }
                            else{
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
                        console.log('No results')
                    }
                    else{
                        const data = snapshot.docs.map(
                            doc => ({
                                id: doc.id,
                                ...doc.data()
                            })
                        )
                        setArray(data)
                    }
                })
                .finally(()=>{
                    setIsLoading(false)
                })
          

        }



    },[categoryId])
    

    
    return  isLoading ? (

        //Shows spinner if it's still loading
        <Loader/>

    ):(
        <div className='item-list-container'>
            <div className='item-list-container-title'>
                <h1>{title.toUpperCase()}</h1>
            </div>
            <ItemList products={array}/>
        </div>

    )
}