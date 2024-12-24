import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext.jsx";

/** Componente que permite al usuario seleccionar la cantidad de un producto.
 * product: es el producto que se pasa como parametro, para tratarlo
 * setQuantity: es una funcion de estado para cambiar el estado del contador
 * productId: es el id del producto
*/
export default function ItemCount({ product, setQuantity, productId }) {
    const [cart, setCart, addItem, deleteItem] = useContext(CartContext);
    const [count, setCount] = useState(0);

    // Busca si el producto ya está en el carrito.
    const itemInCart = cart.find((cartItem) => cartItem.id === productId);

    // Obtiene la cantidad actual del producto en el carrito (si existe).
    const currentQuantityInCart = itemInCart ? itemInCart.quantity : 0;

    // Función para disminuir el contador.
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count-1);
            setQuantity(count - 1);
        }
    }

    // Función para aumentar el contador.
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