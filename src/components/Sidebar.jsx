import React from 'react'
import useQuiosco from '../hooks/useQuiosco'
import { Categoria } from './Categoria'
import { useAuth } from '../hooks/useAuth'

const Sidebar = () => {
  const { categorias } = useQuiosco()
  const {logout,user} = useAuth({middleware:'auth'})
  return (
    <aside className='md:w-72'>
      <div className='p-4 '>
        <img className='w-full' src='img/logo.svg'/>
      </div>
      <p className='mt-10 text-xl text-center'> Hola :  {user?.name} </p>
      <div className='mt-10'>
        {
            categorias.map( cat =>(
                <Categoria key={cat.id} categorias={cat} />
            ))
        }
      </div>
      <div className='my-5 py-5'>
        <button 
        type='button'
        className='text-center bg-red-500 w-full p-3 font-bold text-white truncate'
        onClick={logout}
        >
            Cancelar Orden
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
