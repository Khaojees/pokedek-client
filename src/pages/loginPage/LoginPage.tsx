// import { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import { loginStore } from '@/store/pokemonList'

const LoginPage = () => {
  const { login} = loginStore()
  return (
    <div className="flex text-white flex-col justify-center items-center w-full h-[100vh]">
      <img
          src='/images/logo.webp'
          className='max-h-[80px] mt-[20px]'
          alt=''
        />
      {login? <Login/>
      :<Register/>}
    </div>
  )
}

export default LoginPage
