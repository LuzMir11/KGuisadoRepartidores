import React from 'react'
import styles from '../styles/ShoppingCartProduct.module.css';
export default function ProductoCarritoCompras({ data, deleteFromCart }) {
  return (
    <div className={styles.container_productCart}>
      <h2>{data.name} </h2>
      <p>Descricion: {data.descripcion}  </p>
      <p>Imagen: {data.imagen}  </p>
      <p>Horario: {data.horario}  </p>
      <p>Precio: {data.price} </p>
      <p>Direccion: {data.direccion}  </p>
      <p>Calificacion: {data.calificacion}  </p>
      <p>cantidad: {data.quantity}</p>
      <p>Fecha: {data.fecha}</p>
     
      <button className={styles.btnProductCart} onClick={() => deleteFromCart(data.id)}>Eliminar</button>
    </div>
  )
}
