import { createContext, useState } from "react";
export const CartContext = createContext(false);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addItem = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
    
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            } else {
                return [...prevCart, item];
            }
        });
    };

    const deleteItem = (itemId) => {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId));
    };

    return (
        <CartContext.Provider value={[cart, setCart, addItem, deleteItem]}>
            { children }
        </CartContext.Provider>
    )
}