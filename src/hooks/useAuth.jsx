import clienteAxios from "../config/axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useSWR from  'swr'

export const useAuth= ({middleware,url}) => {
    
    //autenticando al usuario con el token
    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const {data:user , error,mutate } = useSWR('/api/user',()=>
        clienteAxios('/api/user',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    //funcion de logeo
    const login = async (datos,setErrores) =>{
        try {
            const { data } = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            //navigate('/')
            setErrores([])
            // volver a llamar a SWR
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }
    const register =async (datos,setErrores) =>{
        
        try {
            const {data} = await clienteAxios.post('/api/registro', datos)
            navigate('/auth/login')
            setErrores([])
            await mutate()
          } catch (error) {
            setErrores(Object.values(error.response.data.errors) )
          }
      

    }


    const logout = async() =>{
        try {
           await clienteAxios.post('/api/logout',null,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
           })
           localStorage.removeItem('AUTH_TOKEN')
           await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if(middleware === 'guest' && url && user) {
            navigate(url)
        }

        if(middleware === 'guest' && user && user.admin) {
            navigate('/admin');
        }

        if(middleware === 'auth' && user && !user.admin) {
            navigate('/')
        }

        if(middleware === 'auth' && error) {
            navigate('/auth/login')
        }
     }, [user, error]) 


   
    return {
        login,
        register,
        logout,
        user,
        error
    }
}