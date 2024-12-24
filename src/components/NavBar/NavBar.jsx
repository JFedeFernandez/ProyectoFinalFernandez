import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget.jsx';
import '../NavBar/styled.css';

export default function NavBar() {

    return (
        <header>
            <Link className='button-link' to={'/'}>
                Home
            </Link>
            <Link className='button-link' to={"/category/piezas-unicas"}>
                Piezas Únicas
            </Link>

            <Link className='button-link' to={"/category/alfombras"}>
                Alfombras
            </Link>

            <Link className='button-link' to={'/category/hogar-deco'}>
                Hogar & Deco
            </Link>

            <Link className='cart-link' to={'/cart'}>
                <CartWidget/>
            </Link>
        </header>
    );
};