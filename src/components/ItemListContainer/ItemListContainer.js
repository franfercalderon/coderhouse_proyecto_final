import { products } from "../../data/products"
import { useEffect, useState } from "react";
import ItemList from "../ItemList/ItemList";
import {categories} from "../../data/categories"
import Loader from "../Loader/Loader";

export default function ItemsListContainer ({categoryId} ) {
    
    const [array, setArray] = useState([])
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    

    useEffect(()=>{

        setTimeout(()=>{
            setIsLoading(false)
            console.log('loading')
        }, 1200)
        
        //If receives a category Id, finds category name to display title.
        if(categoryId){

            const cat = categories.find(cat => cat.id === +categoryId)
            setTitle(cat.name)
        }

        //If category id > 0, finds items that match that category
        if(categoryId > 0){
            const categoryArray = products.filter(item => item.categoryId === +categoryId)
            setArray(categoryArray)
        }

        else{

        //if no category, shows all products (home page)
            setArray(products)
        }

    }, [categoryId, isLoading])


    
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