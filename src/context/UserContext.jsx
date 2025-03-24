import { createContext, useContext, useEffect, useState } from "react";
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'
import { server } from "../main";
import { Navigate } from "react-router-dom";

const UserContext = createContext()

export const UserProvider = ({children}) => {
const [btnLoading, setbtnLoading] = useState(false)
    async function loginUser(email, navigate){
        setbtnLoading(true)
        try {
            const {data} = await axios.post(`${server}/api/user/login`,
                {email})

                toast.success(data.message);
                localStorage.setItem("verifyToken", data.verifyToken)
                navigate("/verify")
                setbtnLoading(false)
        } catch (error) {
           toast.error(error.response.data.messsage); 
           setbtnLoading(false)
        }
    }

    const [user, setuser] = useState([])
    const [isAuth, setisAuth] = useState(false)

    async function verifyUser(otp, navigate, fetchChats){
        const verifyToken = localStorage.getItem("verifyToken")
        setbtnLoading(true)
        if(!verifyToken) return toast.error("Please give token")
        try {
            const {data} = await axios.post(`${server}/api/user/verify`,
                {otp, verifyToken})

                toast.success(data.message);
                localStorage.clear()
                localStorage.setItem("token", data.token)
                navigate("/")
                setbtnLoading(false)
                setisAuth(true)
                setuser(data.user);
                fetchChats()
        } catch (error) {
           toast.error(error.response.data.message); 
           setbtnLoading(false)
        }
    }

    const [Loading, setLoading] = useState(true)

    async function fetchUser() {
        try {
            const {data} = await axios.get(`${server}/api/user/me`,{
                headers:{
                    token: localStorage.getItem("token")
                }
            })
            setisAuth(true)
            setuser(data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setisAuth(false)
            setLoading(false)
            
        }
    }

    const logoutHandler = () => {
        localStorage.clear()
        toast.success("logged Out")
        setisAuth(false)
        setuser([])
        Navigate("/login");
    }

    useEffect(()=>{
        fetchUser();
    },[])

    return ( <UserContext.Provider value={{loginUser, btnLoading, isAuth, setisAuth, user, verifyUser, Loading,logoutHandler}}>{children}
    <Toaster/>
    </UserContext.Provider>)
}

export const UserData = () => useContext(UserContext)