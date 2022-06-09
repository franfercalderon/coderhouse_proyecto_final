import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";
import { getFirestore, collection, getDocs, query, where} from 'firebase/firestore'

export default function ItemsListContainer ({categoryId} ) {
    
    const [array, setArray] = useState([])
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{

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
    

    // useEffect(()=>{

    //     setTimeout(()=>{
    //         setIsLoading(false)
    //         console.log('loading')
    //     }, 1200)
        
    //     //If receives a category Id, finds category name to display title.
    //     if(categoryId){

    //         const cat = categories.find(cat => cat.id === +categoryId)
    //         setTitle(cat.name)
    //     }

    //     //If category id > 0, finds items that match that category
    //     if(categoryId > 0){
    //         const categoryArray = products.filter(item => item.categoryId === +categoryId)
    //         setArray(categoryArray)
    //     }

    //     else{

    //     //if no category, shows all products (home page)
    //         setArray(products)
    //     }

    // }, [categoryId, isLoading])


    
    return  isLoading ? (

        <Loader/>

    ):(
        <div className='item-list-container'>
            <div className='item-list-container-title'>
                <h1>{title}</h1>
            </div>
            <ItemList products={array}/>
        </div>

    )
}