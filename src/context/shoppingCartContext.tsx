import { createContext, useContext, useState } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';

type ShoppingCartProviderProps = {
    children: React.ReactNode;
}

type CartItem = {
    id: number;
    quantity: number;
}

export type ShoppingContextType = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id:number) => number;
    increaseCartQuantity: (id:number) => void;
    decreaseCartQuantity: (id:number) => void;
    removeFromCart: (id:number) => void;
    cartQuantity: number;
    cartItems: CartItem[];
}

const ShoppingCartContext = createContext<ShoppingContextType | undefined>(undefined);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);


    
    const cartQuantity = cartItems.reduce((quantity, item) => {
        return item.quantity + quantity
    }, 0)

    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    } 

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

    function removeFromCart(id:number) {
        setCartItems(currItems => {
            return currItems.filter(item => {
                return item.id !== id;
            })
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
                }}>
            {children}
            <ShoppingCart 
                isOpen={isOpen}
            />
        </ShoppingCartContext.Provider>
    )
}
