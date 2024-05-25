import React from 'react'
import useQuiosco from '../hooks/useQuiosco'


export const Categoria = ({ categorias }) => {
  const { icono, id, nombre } = categorias
  const { handleClickCategoria, categoriaActual } = useQuiosco()
  return (
    <button
      type='button'
      onClick={() => handleClickCategoria(id)}
      className={`${categoriaActual.id === id && 'bg-amber-400'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
      <img src={`/img/icono_${icono}.svg`} alt="Img Icono" className='w-12' />
      <p className='text-lg font-bold cursor-pointer truncate'

      > {nombre}</p>

    </button>
  )
}
