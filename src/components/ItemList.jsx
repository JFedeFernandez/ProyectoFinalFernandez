import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductContext';
import Item from './Item';
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from 'react-router-dom';
import { filterProductsByCategory } from '../firebase/firebase';

export default function ItemList() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, , globalLoading,] = useContext(ProductsContext);
    const [loading, setLoading] = useState(true);
    const {categoryId} = useParams();

    useEffect( () => {
        setLoading(true);
        setFilteredProducts([]);
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