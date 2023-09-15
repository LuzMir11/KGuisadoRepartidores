/*funcion reducer */
import TYPES from "./actionTypes";



export const productsInitialState = {
  products: [
    {
      "id": 1,
      "name": "Gorditas",
      "descripcion": "",
      "imagen": "",
      "horario": "",
      "price": 50,
      "direccion": "",
      "calificacion": "",
      "cantidad": 10,
      "fecha": ""

    },
    {
      "id": 2,
      "name": "Tortas",
      "descripcion": "",
      "imagen": "",
      "horario": "",
      "price": 30,
      "direccion": "",
      "calificacion": "",
      "cantidad": 10,
      "fecha": ""
    },
    {
      "id": 3,
      "name": "Comida Corrida",
      "descripcion": "",
      "imagen": "",
      "horario": "",
      "price": 30,
      "direccion": "",
      "calificacion": "",
      "cantidad": 10,
      "fecha": ""
    },
    {
      "id": 4,
      "name": "Sopes",
      "descripcion": "",
      "imagen": "",
      "horario": "",
      "price": 78,
      "direccion": "",
      "calificacion": "",
      "cantidad": 10,
      "fecha": ""
    },
    {
      "id": 5,
      "name": "Tacos de bisteck",
      "descripcion": "",
      "imagen": "",
      "horario": "",
      "price": 90,
      "direccion": "",
      "calificacion": "",
      "cantidad": 10,
      "fecha": ""
    
    }
    
  ],
  cart: [],
  totalPriceShoppingCart: 0
}


export const reducerCart = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      const productId = action.payload;
      const productToAdd = state.products.find((product) => product.id === productId);

      if (!productToAdd) {
        // Si el producto no existe en la lista, no hagas nada
        return state;
      }

      const maxQuantity = 10;
      const productInCart = state.cart.find((product) => product.id === productId);

      if (productInCart && productInCart.quantity >= maxQuantity) {
        // No puedes agregar más del límite, así que no hagas nada
        return state;
      }

      const newState = {
        ...state,
        cart: productInCart
          ? state.cart.map((product) =>
              product.id === productId
                ? { ...product, quantity: product.quantity + 1 }
                : product
            )
          : [...state.cart, { ...productToAdd, quantity: 1 }],
        totalPriceShoppingCart: state.totalPriceShoppingCart + productToAdd.price,
        products: state.products.map((product) =>
          product.id === productId
            ? { ...product, cantidad: product.cantidad - 1 }
            : product
        ),
      };

      // Guardar el estado actual del carrito en localStorage
      localStorage.setItem('cart', JSON.stringify(newState.cart));

      return newState;
    }
    
    case TYPES.DELETE_PRODUCT_FROM_CART: {
      // Restaurar la cantidad en la lista de productos cuando se elimina un producto del carrito
      const productIdToDelete = action.payload;
      const productToDelete = state.cart.find((product) => product.id === productIdToDelete);

      if (!productToDelete) {
        // Si el producto no existe en el carrito, no hagas nada
        return state;
      }

      const updatedProducts = state.products.map((product) =>
        product.id === productIdToDelete
          ? { ...product, cantidad: product.cantidad + productToDelete.quantity }
          : product
      );

      const newState = {
        ...state,
        cart: state.cart.filter((product) => product.id !== productIdToDelete),
        totalPriceShoppingCart:
          state.totalPriceShoppingCart - productToDelete.price * productToDelete.quantity,
        products: updatedProducts,
      };

      // Guardar el estado actual del carrito en localStorage
      localStorage.setItem('cart', JSON.stringify(newState.cart));

      return newState;
    }

    // Otros casos...

    default:
      return state;
  }

  throw Error("accion desconocida: " + action.type);
};








