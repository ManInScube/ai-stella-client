import { baseURL } from "../socket";
import { useAuthStore } from "../store/auth";


export const fetchData = async(endpoint: string, method:string) =>{
    const authStore = useAuthStore()

    const req = await fetch(`${baseURL}${endpoint}`,{
        method: method,
        mode: "cors", // no-cors, *cors, same-origin
        headers:{
            "Authorization": `Bearer ${authStore.token}`,
        }
    })
    .then(response => response.json())
    
    return req;
} 

