import React from 'react'
import styles from '../styles/ProductItem.module.css';
export default function c({ data, addToCart }) {
  return (
    <div className={styles.container_product}>
      <h2>{data.name}</h2>
      <p>Descripcion: {data.descripcion}  </p>
      <p>Imagen: {data.imagen}  </p>
      <p>Horario: {data.horario}  </p>
      <p>Precio: {data.price}  </p>
      <p>Direccion: {data.direccion}  </p>
      <p>Calificacion: {data.calificacion}  </p>
      <p>cantidad: {data.cantidad}</p>
      <p>Fecha: {data.fecha}</p>
      <button className={styles.btnProduct} onClick={() => addToCart(data.id)}>Añadir</button>
    </div>
  )
}
