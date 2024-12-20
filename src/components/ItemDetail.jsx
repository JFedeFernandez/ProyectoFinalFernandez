import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";
import ClipLoader from 'react-spinners/ClipLoader';
import ItemCount from "./ItemCount";
import {CartContext} from '../context/CartContext';
import { getSingleProduct } from "../firebase/firebase";


export default function ItemDetail() {

    const { id } = useParams();
    const [,,globalLoading,] = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const [,,addItem] = useContext(CartContext);
    const [product, setProduct] = useState({});
    const [showItemCount, setShowItemCount] = useState(true);
    const [quantity, setQuantity] = useState(0);

    useEffect( () => {
        setLoading(true);
        if (id) {
            getSingleProduct(id)
                .then((prods) => setProduct(prods))
                .catch((error) => console.error("Error fetching product:", error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false)
        }
    },[id])

    const hiddenClick = () => {
        if (quantity > 0) {
            addItem({ ...product, quantity, id:id });
            setShowItemCount(false);
        }
    }

    return (
        <>
            {loading || globalLoading? (
                <div className='loader-container'>
                    <ClipLoader size={100}/>
                </div>
            ) : (
                <>
                    <div className="card-image-container">
                        <img className="card-image" src={product.image}/>
                    </div>
                    <div className="card-detail">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        {showItemCount && <ItemCount product={product} setQuantity={setQuantity} productId={id}/>}
                        <p>Precio: ${product.price}</p>
                        <p>En Stock: {product.stock}</p>
                        <button onClick={hiddenClick} disabled={!showItemCount} className="buttom-cart">Agregar al carrito</button>
                    </div>
                </>
            )}
        </>
    );
};