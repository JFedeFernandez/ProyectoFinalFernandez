import { Link } from 'react-router-dom';

export default function Item({ product }){

    return(
        <>
            <div className='item-card'>
                <img className="img-card" src={product.image} alt={product.title} />
                <div className='div-title'>
                    <h2>{product.title}</h2>
                </div>
                <div>
                    <p>Price $ {isNaN(product.price) ? "Invalid price" : product.price}</p>
                </div>
                <Link to={`/products/${product.id}`}>Ver más..</Link>
            </div>
        </>
    );
};