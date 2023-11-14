import { useState } from "react"
import { loginStore } from '@/store/pokemonList'
import { getRegisterServices } from '@/services'
const Register = () => {
      const [firstName,setFirstName] = useState('')
      const [lastName,setLastName] = useState('')
      const [userName,setUserName] = useState('')
      const [password,setPassword] = useState('')

      const [checkUserNameTaken,setCheckUserNameTaken] = useState(false)
      const [checkFirstName,setCheckFirstName] = useState(false)
      const [checkLastName,setCheckLastName] = useState(false)
      const [checkUserName,setCheckUserName] = useState(false)
      const [checkPassword,setCheckPassword] = useState(false)

      const { setLogin } = loginStore()

const handleSubmit =async(e:any)=>{
      e.preventDefault()
      try {
            if(firstName && lastName && userName && password){
                  const response = await getRegisterServices.getRegister({
                        "firstName":firstName, 
                        "lastName":lastName,
                        "userName":userName,
                        "password":password
                  })
                  if(response.data?.success){
                        setLogin(true)
                        setCheckFirstName(false)
                        setCheckLastName(false)
                        setCheckUserName(false)
                        setCheckPassword(false)
                        setCheckUserNameTaken(false)
                  }else{
                        setCheckUserNameTaken(true)
                        if(!firstName) {setCheckFirstName(true)}else{setCheckFirstName(false)}
                        if(!lastName) {setCheckLastName(true)}else{setCheckLastName(false)}
                        if(!userName) {setCheckUserName(true)}else{setCheckUserName(false)}
                        if(!password) {setCheckPassword(true)}else{setCheckPassword(false)}
                  }
            }
            else{
                  if(!firstName) {setCheckFirstName(true)}else{setCheckFirstName(false)}
                  if(!lastName) {setCheckLastName(true)}else{setCheckLastName(false)}
                  if(!userName) {setCheckUserName(true)}else{setCheckUserName(false)}
                  if(!password) {setCheckPassword(true)}else{setCheckPassword(false)}
            }
            
      } catch (error) {
            console.log(error)
      }
}
  return (
      <div className="mt-[10px]">
      <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-[20px]">
                  <label className='block mb-2 text-mb font-medium text-white'>FIRSTNAME</label>
                  <input
                  className={`bg-[#253641] capitalize border ${!checkFirstName? "border-gray-300": "border-red-400"} 
                  text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block max-w-[350px] w-[80vw] p-2.5`}
                   type="text" 
                   value={firstName}
                   onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div className="flex flex-col mt-[20px]">
                  <label className='block mb-2 text-mb font-medium text-white'>LASTNAME</label>
                  <input
                  className={`bg-[#253641] capitalize border ${!checkLastName? "border-gray-300": "border-red-400"} 
                  text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block max-w-[350px] w-[80vw] p-2.5`}
                   type="text" 
                   value={lastName}
                   onChange={(e)=>setLastName(e.target.value)}/>
            </div>
            <div className="flex flex-col mt-[20px]">
                  <label className='block mb-2 text-mb font-medium text-white'>USERNAME
                        {checkUserNameTaken && 
                        <span className="ml-1 text-sm font-thin text-red-300">Username already taken</span>}
                  </label>
                  <input
                  className={`bg-[#253641] capitalize border ${!checkUserName? "border-gray-300": "border-red-400"} 
                  text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block max-w-[350px] w-[80vw] p-2.5`}
                   type="text" 
                   value={userName}
                   onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="flex flex-col mt-[20px]">
                  <label className='block mb-2 text-mb font-medium text-white'>PASSWORD</label>
                  <input
                  className={`bg-[#253641] capitalize border ${!checkPassword? "border-gray-300": "border-red-400"} 
                  text-white text-sm rounded-lg focus:ring-[#375EAA] focus:border-[#375EAA] block max-w-[350px] w-[80vw] p-2.5`}
                  type="password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="flex flex-col mt-[20px] justify-center items-center">
                  <input
                  className='bg-[#1e3a8a] border border-gray-300 text-white text-xl font-medium rounded-lg hover:ring-[#375EAA] hover:border-[#375EAA] w-[100px] p-2.5
                  cursor-pointer hover:bg-[#172554]'
                  type="submit" value="Register"/>
            </div>
            <div className="flex flex-col mt-[10px] justify-center items-center
            sm:flex-row">
                  <p className="m-2 text-xl font-medium">Have a menber?</p>
                  <p className="m-2 text-[#38bdf8] text-xl font-medium hover:text-[#0284c7] cursor-pointer"
                  onClick={()=>setLogin(true)}>Login now</p>
            </div>
      </form>
    </div>
  )
}

export default Register