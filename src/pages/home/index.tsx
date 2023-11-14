import PokemonCard from '@/components/PokemonCard'
import SearchForm from '@/components/SearchForm'
import { usePokemonListStore } from '@/store/pokemonList'
import React from 'react'
import ReactLoading from 'react-loading'
import { useToken } from '@/utils/token'
import { getRegisterServices } from '@/services'
import { useEffect, useState } from 'react';
import {voteDataStore,scoreStore} from '@/store/pokemonList'

const HomePage = () => {
  const { pokemon, fetchPokemon } = usePokemonListStore()
  const { clearToken,getUser } = useToken()
  const {score,setScore} = scoreStore()
  const {voteData,setVoteData} = voteDataStore()
  const [showAll,setShowAll] = useState(true)

  useEffect(()=>{
    getAllScore()
    getVoteAllScore()
  },[])
  
  const getAllScore =async()=>{
    let response = await getRegisterServices.getScore()
    // console.log('score = ',response.data?.data)
    setScore(response.data?.data)
  }
  const getVoteAllScore =async()=>{
    let response = await getRegisterServices.getVoteScore()
    // console.log('vote score = ',response.data?.data)
    setVoteData(response.data?.data)
  }
  

  const handleLogout=()=>{
    // console.log('log out jaaaa')
    clearToken()
    location.reload()
  }

  return ( 
    <div className='w-[90%] m-[auto] max-w-[1100px]'>
      <div className='flex flex-col items-center justify-center relative'>
        <div className='flex text-white items-center justify-end w-full mt-[10px]'>
          <p className='m-1 text-xl font-medium'>{getUser()}</p>
          <p className='m-1 text-[#38bdf8] text-xl font-medium hover:text-[#0284c7] cursor-pointer'
          onClick={handleLogout}>LOGOUT</p>
        </div>
        <div>
          <img
            src='/images/logo.webp'
            className='max-h-[80px] mt-[20px]'
            alt=''
          />
        </div>        
      </div>
      <SearchForm />
      {fetchPokemon.loading && (
        <div className='h-[600px] flex justify-center items-center'>
          <ReactLoading type='spin' color='#fff' />
        </div>
      )}
      {!fetchPokemon.loading && (
        <div>
          <div className='flex justify-end text-white mt-[20px]'>
            {showAll?
              <button className='bg-[#1e3a8a] border border-gray-300 text-white text-sm font-medium rounded-lg px-2.5 py-1
                  transition ease-in-out hover:bg-[#172554] hover:ring-[#375EAA] hover:border-[#375EAA] duration-300'
                  onClick={()=>setShowAll(!showAll)}>
                    Show your favorite Pokemon
            </button>
            :<button className='bg-[#1e3a8a] border border-gray-300 text-white text-sm font-medium rounded-lg px-2.5 py-1
                  transition ease-in-out hover:bg-[#172554] hover:ring-[#375EAA] hover:border-[#375EAA] duration-300'
                  onClick={()=>setShowAll(!showAll)}>
                    Show all Pokemon
            </button>}
          </div>        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-[20px] mt-[20px] justify-center'>          
          {pokemon.data?.map((item) => {
            return (
              <React.Fragment key={`pokemon-${item.name}`}>
                {showAll &&
                <PokemonCard
                  image={item.image || ''}
                  name={item.name}
                  id={item.id}
                  types={item.types}
                />}

                {!showAll &&
                voteData.map((e:any)=>{
                  const { getUUIDUser } = useToken()
                    if(e.pokemon_id == item.id && e.user_uuid == getUUIDUser()){      
                      return true
                    }
                  return false
                }).indexOf(true)>=0 &&
                <PokemonCard
                  image={item.image || ''}
                  name={item.name}
                  id={item.id}
                  types={item.types}
                />}
              </React.Fragment>
            )
          })}
        </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
