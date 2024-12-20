import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProductsProvider } from './context/ProductContext';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import CheckoutForm from './components/CheckoutForm';

function App() {
  return (
    <main className='main-container'>
      <CartProvider>
        <BrowserRouter>
          <ProductsProvider>
            <NavBar/>
            <Routes>
              <Route exact path='/' element={<ItemListContainer/>}/>
              <Route exact path='/category/:categoryId' element={<ItemListContainer/>}/>
              <Route exact path='/products/:id' element={<ItemDetailContainer/>}/>
              <Route exact path='/cart' element={<Cart/>}/>
              <Route exact path='/checkout' element={<CheckoutForm/>}/>
            </Routes>
          </ProductsProvider>
        </BrowserRouter>
      </CartProvider>
    </main>
  )
}

export default App
