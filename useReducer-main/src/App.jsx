import { useEffect, useReducer } from 'react';
import './App.css';
import ProductItem from './components/ProductItem';
import ShoppingCartProduct from './components/ShoppingCartProduct';
import { reducerCart, productsInitialState } from './reducers/shoppingCart_reducer';
import TYPES from './reducers/actionTypes'

function App() {
   // Inicializa el estado del carrito recuperando datos de localStorage si existen
   const [state, dispatch] = useReducer(reducerCart, productsInitialState);

   useEffect(() => {
     // Recupera los datos del carrito de localStorage al cargar la página
     const cartData = localStorage.getItem('cart');
     if (cartData) {
       // Si hay datos en localStorage, actualiza el estado del carrito con esos datos
       dispatch({ type: 'RESTORE_CART', payload: JSON.parse(cartData) });
     }
   }, []);
 

  const addToCart = (id) => {
    dispatch({
      type: TYPES.ADD_TO_CART,
      payload: id,
    });
  };

  const deleteFromCart = (id) => {
    dispatch({
      type: TYPES.DELETE_PRODUCT_FROM_CART,
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: TYPES.DELETE_ALL_FROM_CART,
    });
  };

  const calculateTotalPriceOfCart = () => {
    dispatch({ type: TYPES.CALCULATE_TOTAL_PRICE_OF_THE_CART });
  };

  return (
    <>
      <header>
        <nav className="menu">
          <ul>
            <li><a href="#">falta aclarar contenido</a></li> 
            
            
          </ul>
        </nav>
        <div className="yellow-content-bar"></div>
      </header>

      <div className="yellow-bar"></div>
      <hr />
      <h1 className='title'>Menu</h1>
      <hr />
      <h2 className='subtitle_products'>LISTA DE PLATILLOS</h2>
      <div className='container_grid_products'>
        {state.products.map((product) => (
          <ProductItem key={product.id} data={product} addToCart={addToCart} />
        ))}
      </div>

      <hr />
      <h2 className='subtitle_shopping_cart'>Carrito de compras</h2>
      <div className='container_buttons'>
        <button className='btn btn_totalPrice' onClick={() => calculateTotalPriceOfCart()}></button>
        {state.totalPriceShoppingCart > 0 && (
          <p className='totalPrice_shoppingCart'>Total : {state.totalPriceShoppingCart}</p>
        )}
        <button className='btn btn_ClearCart' onClick={() => clearCart()}></button>
      </div>
      {state.cart.length === 0 && <p className='text_NoProductsInCart'>LISTA DE PRODUCTOS CARGADOS </p>}

      <div className='container_grid_shopping_cart'>
        {state.cart.map((productCart) => (
          <ShoppingCartProduct key={productCart.id} data={productCart} deleteFromCart={deleteFromCart} />
        ))}
      </div>
    </>
  );
}

export default App;
