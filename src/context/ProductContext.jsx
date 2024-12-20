import { createContext, useEffect, useState } from 'react';
import { getProducts } from '../firebase/firebase.js';

export const ProductsContext = createContext(false);

export function ProductsProvider( {children} ) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        getProducts().then((prods) => setProducts(prods));
        setLoading(false);
    },[]);
    
    return (
        <ProductsContext.Provider value={[products, setProducts, loading, setLoading]}>
            {children}
        </ProductsContext.Provider>
    );
};