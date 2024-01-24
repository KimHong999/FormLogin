import { api } from "@/utils/api"


export const create = async(newLogin)=>{
    // console.log(newLogin)
    const response = await api.post('/auth/login',newLogin)
    return response.data
    
}
