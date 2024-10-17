import React, { useContext } from 'react'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const Producto = ({ productos ,botonAgregar= false , botonDisponible = false }) => {
  const { handleClickModal,handleSetProducto,handleClickProductoAgotado } = useQuiosco()
  const { nombre, imagen, precio } = productos
  return (
    <div className='border p-3 shadow bg-white flex flex-col justify-between'>
      <img src={`/img/${imagen}.jpg`} alt={`Imagen ${nombre}`} className='w-full' />
      <div className='p-5'>
        <h3 className='text-2xl font-bold'>{nombre}</h3>
        <p className='mt-5 font-black text-4xl text-amber-500'>{formatearDinero(precio)}</p>
      </div>
      {
        botonAgregar  && (
          <button
        type='button'
        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold'
        onClick={() => {
          handleClickModal()
          handleSetProducto(productos)
        } }
      >
        Agregar
      </button>
        )
      }

{
        botonDisponible  && (
          <button
        type='button'
        className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold'
        onClick={() => handleClickProductoAgotado(productos.id) }
      >
        ProductoAgotado
      </button>
        )
      }
      
    </div>

  )
}

export default Producto
