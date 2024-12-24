import NavBar from './components/NavBar/NavBar.jsx';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ProductsProvider } from './context/ProductContext.jsx';
import ItemListContainer from './screens/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './screens/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './screens/Cart/Cart.jsx';
import { CartProvider } from './context/CartContext.jsx';
import CheckoutForm from './screens/CheckoutForm/CheckoutForm.jsx';

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
