import Producto from "../components/Producto"
import  SWR from 'swr'
import useQuiosco from "../hooks/useQuiosco"
import clienteAxios from "../config/axios"
import useSWR from "swr"


const Inicio = () => {

  const {categoriaActual} = useQuiosco()

  //consulta en SWR 
  const fetcher = () => clienteAxios('/api/productos').then(data =>data.data)
 
  const {data,error,isLoading} = useSWR('/api/productos', fetcher,{
    // refreshInterval sirve para que haya un cierto comportamiento de cambios en tiempo real
    refreshInterval :  1000
  })

  if(isLoading) return 'Cargando...';

  const productos = data.data.filter(prod => prod.categoria_id === categoriaActual.id)
  
  return (
    <>
    <h1 className="text-4xl font-black"> {categoriaActual.nombre} </h1>
    <p className="text-2xl my-10">
      Elige y  personaliza tu pedido a continuacion.
    </p>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    {productos.map(prod=>(
        <Producto key={prod.imagen}  productos={prod} />
      ))}
    </div>
      
    </>
  )
}

export default Inicio
