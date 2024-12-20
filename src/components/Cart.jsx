import { useContext, useState, useEffect } from "react";
import CartItem from "./CartItem.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import ClipLoader from 'react-spinners/ClipLoader';

export default function Cart() {
    const [loading, setLoading] = useState(true);
    const [cart,,, ] = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    //Calcula el total de los precios de los productos en el carrito
    const calcTotal = () => {
        const totalAmount = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotal(totalAmount);
    }

    useEffect(() => {
        calcTotal();
    }, [cart]);

    useEffect(() => {
        // Simula la carga y luego establece loading en false
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500); // Ajusta el tiempo de espera según sea necesario
        return () => clearTimeout(timer);
    }, []);

    return(
        <div>
            {loading ? (
                    <div>
                        <ClipLoader size={100}/>
                    </div>
            ) : (
                <div className="cart">
                    { (total===0) ? (
                        <p>No hay productos en el carrito</p>
                    ) : (
                        <>
                            <p>Total: ${total}</p>
                            {cart.map((item) => (
                                <CartItem key={item.id} product={item}/>
                            ))}
                            <button onClick={() => navigate("/checkout")} className="checkout-button">Checkout</button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}