import { useState } from "react"
import { loginStore } from '@/store/pokemonList'
import { getRegisterServices } from '@/services'
import { useToken } from '@/utils/token'

const Login = () => {
      const [userName,setUserName] = useState('')
      const [password,setPassword] = useState('')
      const { setLogin } = loginStore()
      const { saveToken,saveUser } = useToken()
      const [checkUser,setCheckUser] = useState(false)
      // const [checkPassword,setCheckPassword] = useState(false)
      const [errMsg,setErrMsg] = useState('haha')

      const handleLogin=async(e:any)=>{
            e.preventDefault()
            try {
                  const response = await getRegisterServices.getLogin({
                        "userName":userName,
                        "password":password
                  })
                  if(response.data?.success){
                        saveUser(response.data?.data[0].userName)
                        saveToken(response.data?._token)
                        location.reload()
                  }else{
                        setErrMsg(response.data?.data)
                        setCheckUser(true)        
                  }                  
            } catch (error) {
                  console.log(error)
            }
            
      }
  return (
    <div className="mt-[10px]">
      <form onSubmit={handleLogin}>
            <div className="flex flex-col mt-[20px]">
                  <label className='block mb-2 text-mb font-medium text-white'>USERNAME</label>
                  <input
                  className='bg-[#253641] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block max-w-[350px] w-[80vw] p-2.5'
                   type="text" 
                   value={userName}
                   onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="flex flex-col mt-[20px]">
                  <label className='block mb-2 text-mb font-medium text-white'>PASSWORD</label>
                  <input
                  className='bg-[#253641] capitalize border border-gray-300 text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block max-w-[350px] w-[80vw] p-2.5'
                  type="password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="flex flex-col mt-[20px] justify-center items-center">
                  <input
                  className='bg-[#1e3a8a] border border-gray-300 text-white text-xl font-medium rounded-lg hover:ring-[#375EAA] hover:border-[#375EAA] w-[100px] p-2.5
                  cursor-pointer hover:bg-[#172554]'
                  type="submit" value="Login"/>
            </div>
            <div className="mt-2 flex justify-center items-center text-red-300">
                  {checkUser && <p>{errMsg}</p>}
            </div>
            <div className="flex flex-col mt-[10px] justify-center items-center
            sm:flex-row">
                  <p className="m-2 text-xl font-medium">Not a menber?</p>
                  <p className="m-2 text-[#38bdf8] text-xl font-medium hover:text-[#0284c7] cursor-pointer"
                  onClick={()=>setLogin(false)}>Register now</p>
            </div>
      </form>
    </div>
  )
}

export default Login