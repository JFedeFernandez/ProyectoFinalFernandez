import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function ItemCount({ product, setQuantity, productId }) {
    const [cart,,,] = useContext(CartContext);
    const [count, setCount] = useState(0);

    const itemInCart = cart.find((cartItem) => cartItem.id === productId);
    const currentQuantityInCart = itemInCart ? itemInCart.quantity : 0;

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count-1);
            setQuantity(count - 1);
        }
    }

    const handleIncrement = () => {
        if (count + currentQuantityInCart < product.stock){
            setCount(count+1);
            setQuantity(count+1);
        }
    }

    return (
        <div className="buttoms-count">
            <button className="buttons-count" onClick={handleDecrement}>-</button>
            <p className="number-count">{count}</p>
            <button className="buttons-count" onClick={handleIncrement}>+</button>
        </div>
    );
};