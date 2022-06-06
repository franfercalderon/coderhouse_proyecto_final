import { createContext, useState } from 'react'

const CartContext = createContext() 

const {Provider} = CartContext

const CartProvider = ({children}) => {


    //Declares cart, empty at first.
    const [cart, setCart] = useState([])
    
    const addToCart = (qty, product)=>{
        
        //Check if product is in cart
        if(isInCart(product.id)){

            //Maps the cart looking for the selected product, then sets new quantity and sets new cart.
            const newCart = cart.map(prod =>{
                if(prod.id === product.id){
                    prod.quantity= prod.quantity + qty
                }
                return prod
            })
            setCart(newCart)
        }
        else{

            //If item was not in cart, sets cart including the new product.
            setCart([...cart, {...product, quantity: qty}])
        }
    }

   
    const removeFromCart = (product) =>{

        //returns new cart without products with selected id
        const newCart = cart.filter((prod)=>
            prod.id !== product.id
        )
        setCart(newCart)

    }

    const emptyCart = () =>{

        //Sets en empty cart
        setCart([])
    }

    const isInCart = (id) =>{

        //Looks if item is in cart and returns boolean
        return cart.find(item => item.id === id)
    }

    const cartQty = () =>{

        //Returns total amount of items in cart
        return cart.reduce((prev, cur) => prev + cur.quantity, 0)

    }

    const totalPrice = () =>{

        //Returns total cart price reducing array's price property * quantity
        return cart.reduce((prev, cur) => prev + (cur.price * cur.quantity), 0)

    }



    return(
        <Provider value={{
            cart,
            addToCart,
            removeFromCart, 
            cartQty,
            totalPrice
        }}>
            {children}
        </Provider>
    )
}

export {CartContext, CartProvider}



 

