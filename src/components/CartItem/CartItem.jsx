import { useContext } from "react";
import { CartContext } from "../../context/CartContext.jsx";
import "./styled.css";

export default function CartItem({ product }) {

    const [cart, setCart, addItem, deleteItem] = useContext(CartContext);

    //Elimina un elemento del carrito
    const handleDelete = () => {
        deleteItem(product.id); 
    };
    
    return(
        <>
            <article className="cart-item">
                <h2>{product.title}</h2>
                <p>x {product.quantity}</p>
                <p>${product.price}</p>
                <button onClick={handleDelete}>Eliminar</button>
            </article>
        </>
    )
}