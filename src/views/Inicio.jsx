import Producto from "../components/Producto"
import  SWR from 'swr'
import useQuiosco from "../hooks/useQuiosco"
import clienteAxios from "../config/axios"
import useSWR from "swr"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


const Inicio = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('AUTH_TOKEN')
  const {categoriaActual} = useQuiosco()
  useAuth({
    middleware:'auth'
  })

  const [productos , setProductos ] = useState([])
  //consulta en SWR 
  // const fetcher = () => clienteAxios('/api/productos',{
  //   headers: {
  //     Authorization: `Bearer ${token}`
  // }
  // }).then(data =>data.data)
 
  // const {data,error,isLoading} = useSWR('/api/productos', fetcher,{
  //   // refreshInterval sirve para que haya un cierto comportamiento de cambios en tiempo real
  //   refreshInterval :  1000
  // })
  // if (error ) {
  //   navigate('/auth/login')
  // }
  // if(isLoading) return 'Cargando...';
  // const productos = data.data ?  data.data.filter(prod => prod.categoria_id === categoriaActual.id)  : 'Cargando'

  const obteniendoProductos =  async() =>{
    
    const  {data} = await clienteAxios('/api/productos',{
       headers: {
         Authorization: `Bearer ${token}`
     }
     })
    
     const productos =  data.data.filter(prod => prod.categoria_id === categoriaActual.id)
      setProductos(productos)

    }


useEffect(() => {
  obteniendoProductos()
}, [categoriaActual])

 

  return (
    <>
    
    <h1 className="text-4xl font-black"> {categoriaActual.nombre} </h1>
    <p className="text-2xl my-10">
      Elige y  personaliza tu pedido a continuacion.
    </p>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
     {productos ? (
              productos.map(prod=>(
                <Producto key={prod.imagen}  productos={prod} botonAgregar={true} />
      ))):(
        <>cargando</>
      )}
    </div>
      
    </>
  )
}

export default Inicio
