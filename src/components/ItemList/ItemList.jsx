import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../../context/ProductContext';
import Item from '../Item/Item.jsx';
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from 'react-router-dom';
import { filterProductsByCategory } from '../../firebase/firebase.js';
import '../ItemList/styled.css';

// Componente principal que muestra una lista de productos
export default function ItemList() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products,setProducts, globalLoading,setGlobalLoading] = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const {categoryId} = useParams();

    // Hook useEffect que se ejecuta cuando cambian 'categoryId' o 'products'
    useEffect( () => {
        setLoading(true);
        setFilteredProducts([]);

        // Función asíncrona para obtener los productos según la categoría
        const fetchProducts = async () => {
            if (categoryId) {
                try {
                    const prods = await filterProductsByCategory(categoryId);
                    setFilteredProducts(prods);
                } catch (error) {
                    console.error("Error fetching products:", error);
                    setFilteredProducts([]);
                }
            } else {
                setFilteredProducts(products); 
            }
            setLoading(false); 
        };

        // Si no hay productos en el contexto global, activa el estado de carga
        if (products.length === 0) {
            setLoading(true);
        } else {
            fetchProducts();
        }
    },[categoryId, products]);

    return (
        <>
            {loading || globalLoading ? (
                <div className='loader-container'>
                    <ClipLoader size={100}/>
                </div>
            ) : (
                <div className='card'>
                    {filteredProducts.map((prod) =>(
                        <Item key={prod.id} product={prod}/>
                    ))}
                </div>
            )}
        </>
    );
};