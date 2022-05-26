import { createContext, useState } from 'react'

export const CartContext = createContext() 

const Provider = CartContext.Provider

export default function CartProvider ({children}){
    
    const [cart, setCart] = useState([])

    // const contextValue = {
    //     cart: cart,
    //     setCart: setCart
    // }
    // console.log('context')

    const addToCart = (item)=>{
        console.log(item)
    }

    return(
        <Provider >
            {children}
        </Provider>
    )
}



 

