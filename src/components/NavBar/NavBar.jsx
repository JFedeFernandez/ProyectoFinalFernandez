import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget.jsx';
import { IoMenu } from "react-icons/io5";
import '../NavBar/styled.css';
import { useState } from 'react';

export default function NavBar() {

    const [isTrue, setIsTrue] = useState(false);

    const handleClick = () => {
        setIsTrue((prev) => !prev);
    }

    return (
        <header className={`header ${isTrue ? 'navbar-expanded' : ''}`}>
            <span onClick={handleClick} className='menu-navbar'><IoMenu /></span>
            <nav className={`navbar ${isTrue && "open"}`}>
                <Link className={`button-link ${isTrue && "open"}`} to={'/'}>
                    Home
                </Link>
                <Link className={`button-link ${isTrue && "open"}`} to={"/category/piezas-unicas"}>
                    Piezas Únicas
                </Link>

                <Link className={`button-link ${isTrue && "open"}`} to={"/category/alfombras"}>
                    Alfombras
                </Link>

                <Link className={`button-link ${isTrue && "open"}`} to={'/category/hogar-deco'}>
                    Hogar & Deco
                </Link>
            </nav>
            <Link className='cart-link' to={'/cart'}>
                <CartWidget/>
            </Link>
        </header>
    );
};