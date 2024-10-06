import axiosInstance from "@/src/lib/AxiosInostance"
import { FriendsProps } from "@/src/types"



export const getAllUsers = async() =>{
    
    try {
        const {data} =await axiosInstance.get('/users/get-all-user')
        return data
      
    } catch (error:any) {
        throw new Error(error)
    }
}
export const getMyFriendRequests = async(userId:string) =>{
    
    try {
        const {data} =await axiosInstance.get(`/friends/get-my-friendsRequests/${userId}`)
        return data
      
    } catch (error:any) {
        throw new Error(error)
    }
}
export const acceptFriendRequest = async(userId:string,friendsId:string) =>{
    
    try {
        const {data} =await axiosInstance.patch(`/friends/accept/${userId}/${friendsId}`)
        return data
      
    } catch (error:any) {
        throw new Error(error)
    }
}
export const rejectFriendRequests = async(userId:string,friendsId:string) =>{
    
    try {
        const {data} =await axiosInstance.patch(`/friends/reject/${userId}/${friendsId}`)
        return data
      
    } catch (error:any) {
        throw new Error(error)
    }
}
export const getAllMyFriends = async(userId:string) =>{
    
    try {
        const {data} =await axiosInstance.get(`/users/get-all-friends/${userId}/`)
        return data
      
    } catch (error:any) {
        throw new Error(error)
    }
}
// The mutation function to create a friend request
export const createFriendRequests = async (friends:FriendsProps) => {
  try {
    const { data } = await axiosInstance.post('/friends', friends);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};