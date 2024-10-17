import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify";

import clienteAxios from "../config/axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)


    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const ObtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/categorias',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        ObtenerCategorias()
    }, [])

    const handleClickCategoria = id => {
        const categoriasFiltradas = categorias.filter(cat => cat.id === id)[0]
        setCategoriaActual(categoriasFiltradas)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = prod => {
        setProducto(prod)
    }




    const handleAgregarPedido = ({ categoria_id, ...prod }) => {

        if (pedido.some(pedidoState => pedidoState.id === prod.id)) {
            const productoActualizado = pedido.map(pedidoState => pedidoState.id === prod.id ? prod : pedidoState)
            setPedido(productoActualizado);
            toast.success('Actualizaste tu Pedido');
        } else {
            setPedido([...pedido, prod])
            toast.success('Agregaste Pedido');
        }
    }


    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0];
        setProducto(productoActualizar)
        setModal(!modal)

    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminando del Pedido')
    }

    const handleSubmitNuevaOrden = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios.post('/api/pedidos',
                {
                    total,
                    productos: pedido.map((producto) => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad
                        }
                    }),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }


    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`,null,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`,null,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider value={
            {
                total,
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }
        }>
            {children}
        </QuioscoContext.Provider>
    )
}
export {
    QuioscoProvider
}
export default QuioscoContext
