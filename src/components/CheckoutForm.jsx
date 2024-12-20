import { useContext, useState } from "react";
import { sendOrder, updateDocuments } from "../firebase/firebase";
import { CartContext } from "../context/CartContext";
import {ProductsContext} from '../context/ProductContext';
import ClipLoader from 'react-spinners/ClipLoader';

export default function CheckoutForm() {
    const [cart, setCart] = useContext(CartContext);
    const [orderId, setOrderId] = useState(null);
    const [, , globalLoading] = useContext(ProductsContext);
    const [loading, setLoading] = useState(false);
    const [orderDetails, setOrderDetails] = useState({})

    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
    });

    const [formData, setFormData] = useState({
        name:"",
        surname:"",
        phone:"",
        email:"",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })

        setErrors({
            ...errors,
            [name]: "",
        });
    }

    const validateForm = () => {
        const newErrors = {};
        let valid = true;

        // Validacion name
        if (!formData.name) {
            newErrors.name = "El nombre es requerido *";
            valid = false;
        } else if (!/^[a-zA-Z]+$/.test(formData.name)) {
            newErrors.name = "El nombre solo puede contener letras *";
            valid = false;
        }

        //Validacion surname
        if (!formData.surname) {
            newErrors.surname = "El apellido es requerido *";
            valid = false;
        } else if (!/^[a-zA-Z]+$/.test(formData.surname)) {
            newErrors.surname = "El nombre solo puede contener letras *";
            valid = false;
        }

        //Validacion phone
        if (!formData.phone) {
            newErrors.phone = "El teléfono es requerido *";
            valid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "El teléfono debe ser un número de 10 dígitos *";
            valid = false;
        }

        //Validacion email
        if (!formData.email) {
            newErrors.email = "El email es requerido *";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email debe ser válido *";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };


    const handleClick =  async () => {
        if (!validateForm()) return;
        setLoading(true);

        const totally = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        const filteredItems = cart.map((item) => ({
            id: item.id,
            price: item.price,
            title: item.title,
            quantity: item.quantity,
        }));

        const newOrder = {
            buyer: {
                name: formData.name,
                surname: formData.surname,
                phone: formData.phone,
                email: formData.email,
            },
            date: new Date(),
            items: filteredItems,
            total: totally,
        }

        try {
            // Generar nueva orden
            const id = await sendOrder(newOrder);
            setOrderId(id);
            setOrderDetails(newOrder)
            setCart([]);
    
            // Preparar actualizaciones para el stock
            const stockUpdates = cart.map((item) => ({
                collection: "products",
                id: item.id, 
                data: { stock: item.stock - item.quantity }, // Actualizamos el stock
            }));
    
            // Actualizar stock de los productos
            await  updateDocuments(stockUpdates);
        } catch (error) {
            console.error("Error en el proceso de checkout:", error);
        } finally {
            setLoading(false);
        }
    }
    

    return(
        <div className="form-container">
            {loading || globalLoading ? (
                <div className='loader-container'>
                    <ClipLoader size={100}/>
                </div>
            ) : orderId ? (
                <div>
                    <p>Orden generada: {orderId}</p>
                    <h2>Detalles de la orden</h2>
                    <ul className="order-detail">
                        {orderDetails.items.map((item) => (
                            <li key={item.id}>
                                {item.title} - {item.quantity} unidades - ${item.price}
                            </li>
                        ))}
                        <p>Total: ${orderDetails.total}</p>
                    </ul>
                </div>
            ) : (
                <>
                    <form className="form-control">
                        <label>
                            Nombre 
                            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                            {errors.name && <p className="error">{errors.name}</p>}
                        </label>
                        <label>
                            Apellido
                            <input type="text" name="surname" value={formData.surname} onChange={handleChange}/>
                            {errors.surname && <p className="error">{errors.surname}</p>}
                        </label>
                        <label>
                            Celular
                            <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="358124356"/>
                            {errors.phone && <p className="error">{errors.phone}</p>}
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="pepe@gmail.com"/>
                            {errors.email && <p className="error">{errors.email}</p>}
                        </label>
                    </form>
                    <button onClick={handleClick}>Enviar</button>
                </>
            )}
        
        </div>
    )
}