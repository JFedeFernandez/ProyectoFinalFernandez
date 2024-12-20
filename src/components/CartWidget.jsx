import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {IoCart} from 'react-icons/io5';

export default function CartWidget () {
    const [cart] = useContext(CartContext);

    //Calcula la cantidad total de artículos en el carrito
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    return (
        <>
            {cart.length > 0 ? (
                <article className="cart-button">
                    <IoCart style={{width:100, height:30}}/><p>{totalQuantity}</p>
                </article>
            ) : (
                <article className="cart-button">
                    <IoCart style={{width:100, height:30}}/><p>{totalQuantity}</p>
                </article>
            )}
        </>
    )
}