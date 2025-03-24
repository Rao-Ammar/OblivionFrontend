import { createContext, useContext, useEffect, useState } from "react";
// import { User } from "../../../backend/models/User";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const ChatContext = createContext()

export const ChatProvider = ({children}) => {
    const [messages, setmessages] = useState([])
    const [prompt, setprompt] = useState("")
    const [newRequestLoading, setnewRequestLoading] = useState(false)

    async function fetchResponse(){
        if(prompt==="") return alert("Write prompt")
            setnewRequestLoading(true)
        setprompt("")
        try {
            const response = await axios({
                url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCNJiSAXRmc9dA5FHSddPdNLCbF1DwPINk",
                method:"post",
                data:{
                    contents:[{parts:[{text: prompt }]}]
                         
                },
            })
            const message = {
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            }
            setmessages((prev)=>[...prev, message])
            setnewRequestLoading(false)

            const {data} = await axios.post(`${server}/api/chat/${selected}`,{
                question: prompt,
                answer: response["data"]["candidates"][0]["content"]["parts"][0]["text"],
            },{
                headers:{
                    token: localStorage.getItem("token"),
                }
            })
        } catch (error) {
            alert("something went wrong")
            console.log(error);
            setnewRequestLoading(false)
            
        }
    }
const [chats, setchats] = useState([])
const [selected, setselected] = useState(null)
    async function fetchChats(){
        try {
            const {data} = await axios.get(`${server}/api/chat/all`,{
                headers:{
                    token: localStorage.getItem("token"),
                },
            })

            setchats(data)
            setselected(data[0]._id)
        } catch (error) {
            console.log(error);
            
        }
    }

    const [createLod, setCreateLod] = useState(false)

async function createChat(){
    setCreateLod(true)
    try {
        const {data} = await axios.post(`${server}/api/chat/new`, {},{
            headers:{
                token: localStorage.getItem("token")
            },
        })
        fetchChats()
        setCreateLod(false)
    } catch (error) {
        toast.error("something wentw wrong")
        setCreateLod(false)
    }
}
const [loading, setLoading] = useState(false)

async function fetchMessages(){
setLoading(true)
try {
   const {data} = await axios.get(`${server}/api/chat/${selected}`,{
    headers:{
        token: localStorage.getItem("token"),
    },
   }) 
   setmessages(data)
   setLoading(false)
} catch (error) {
    console.log(error);
    setLoading(false)
    
}
}

async function deleteChat(id){
    try {
        const {data} = await axios.delete(`${server}/api/chat/${id}`,{
            headers:{
                token: localStorage.getItem("token"),
            },
        })
        toast.success(data.message)
        fetchChats()
        window.location.reload()
    } catch (error) {
        console.log(error);
        
        alert("Something went wrong")

    }
}


    useEffect(()=>{
        fetchChats()
    },[])
    useEffect(()=>{
        fetchMessages()
    },[selected])
    return <ChatContext.Provider value={{fetchResponse, messages, prompt, setprompt, newRequestLoading, chats, createChat, createLod, selected, setselected, loading, setLoading, deleteChat, fetchChats}}>{children}</ChatContext.Provider>
}

export const ChatData = ()=> useContext(ChatContext);