import { jwtDecode } from "jwt-decode";

interface Idecode{
      user_id:string,
      exp:number,
      iat:number
}

export const useToken=()=>{

      const saveToken = (tokenData:any)=>{
            window.localStorage.setItem('token',JSON.stringify(tokenData))
      }
      const saveUser = (userData:any)=>{
            window.localStorage.setItem('user',JSON.stringify(userData))
      }

      const getToken=()=>{
            let tokenString: any = window.localStorage.getItem('token')
            let userToken= JSON.parse(tokenString)
            if(userToken){
                  let decode = jwtDecode(userToken)
                  let currentTime = Math.floor((new Date().getTime())/1000)
                  // console.log('decode =',decode.exp)
                  // console.log('currentTime =',currentTime)
                  if(decode.exp! - currentTime <=0){
                        clearToken()
                        return ''
                  }
                  return userToken
            }else{
                  return ''
            }
      }
      const getUUIDUser =()=>{
            let tokenString: any = window.localStorage.getItem('token')
            let userToken= JSON.parse(tokenString)
            if(userToken){
                  let decode:Idecode = jwtDecode(userToken)
                  return decode.user_id
            }else{
                  return ''
            }
      }
      const getUser=()=>{
            let tokenString: any = window.localStorage.getItem('user')
            let userToken= JSON.parse(tokenString)
            if(userToken){
                  return userToken
            }else{
                  return 'Pokemonn'
            }
      }

      const clearToken =()=>{
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('user')
      }

      
      return {
            saveUser,
            getUser,
            getToken,
            saveToken,
            clearToken,
            getUUIDUser
      }
}