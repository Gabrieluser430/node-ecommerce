import { createContext, useContext, useState } from 'react';

type ShoppingCartProviderProps = {
    children: React.ReactNode;
}

type CartItem = {
    id: number;
    quantity: number;
}

type ShoppingContextType = {
    getItemQuantity: (id:number) => number;
    increaseCartQuantity: (id:number) => void;
    decreaseCartQuantity: (id:number) => void;
    removeFromCart: (id:number) => void;
}

const ShoppingCartContext = createContext<ShoppingContextType>({});

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}


export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    function getItemQuantity(id:number) {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id === id) {
                return cartItems[i].quantity;
            }
        }
        return 0;
    }

    function increaseCartQuantity(id:number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                })
            }
        })        
    }

    function decreaseCartQuantity(id:number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => {
                    return item.id !== id;
                })
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item;
                    }
                })
            }
        })        
    }

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity}}>
            {children}
        </ShoppingCartContext.Provider>
    )
}