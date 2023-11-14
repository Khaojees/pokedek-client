import { Type } from '@/interface/pokemonDetail'
import { Link } from 'react-router-dom'
import { AiFillHeart,AiOutlineHeart } from 'react-icons/ai';
import { getRegisterServices } from '@/services'
import { useToken } from '@/utils/token'
import {voteDataStore,scoreStore} from '@/store/pokemonList'
// import { useEffect, useState } from 'react';

interface PokemonCardProps {
  image: string
  name: string
  id: number
  types: Type[]
}

const PokemonCard = ({ image, name, id, types }: PokemonCardProps) => {
  const {score,setScore} = scoreStore()
  const {voteData,setVoteData} = voteDataStore()

  const handleVote=async(e:number)=>{  
    await getRegisterServices.votePokemon({
        "item":[
              {
                  "id":e
              }
          ]
        })
      getAllScore()
      getVoteAllScore()
  }

  const handleDelete=async(e:number)=>{
    await getRegisterServices.deleteVote(e)
    getAllScore()
    getVoteAllScore()
  }
  
  const getAllScore =async()=>{
    let response = await getRegisterServices.getScore()
    setScore(response.data?.data)
    // console.log(response.data?.data.filter((item:any)=>item.pokemon_id == 500))
  }
  const getVoteAllScore =async()=>{
    let response = await getRegisterServices.getVoteScore()
    setVoteData(response.data?.data)
  }

  return (
    <div className='rounded-[20px] overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700 p-[16px] bg-[#253641] max-w-[275px] w-full m-[auto]'>
      <div className="bg-[url('/images/poke-card-bg.png')] bg-center aspect-square w-full bg-cover rounded-[20px]">
        <Link
          to={`/detail/${name}`}
          className="bg-[url('/images/poke-card-bg.png')]"
        >
          <img
            className='rounded-t-lg h-[218px] p-[40px] w-full'
            src={image}
            alt=''
          />
        </Link>
      </div>
      <div className='pt-5'>
        <div className='flex justify-between'>
          <div className='flex justify-between w-full'>
            <h5 className='mb-2 text-xl font-bold tracking-tight text-white'>
              No.{id}
            </h5>
            <h5 className='ml-1 capitalize mb-2 text-xl font-bold tracking-tight text-white'>
              {name}
            </h5>   
          </div>       
        </div>
        <div className='flex justify-between'>
          <div className='flex items-end pb-1 text-white text-xl'>
            {voteData.map((item:any)=>{
              const { getUUIDUser } = useToken()
                if(item.pokemon_id == id && item.user_uuid == getUUIDUser()){      
                  return true
                }
              return false
            }).indexOf(true)>=0? 
            <p className='cursor-pointer'
            onClick={()=>handleDelete(id)}><AiFillHeart/> </p>            
            :
            <p className='cursor-pointer'
            onClick={()=>handleVote(id)}><AiOutlineHeart/></p>            
            }
            <p className='ml-1 text-sm'>{
            score.filter((item:any)=>item.pokemon_id == id).length>0?
            score.filter((item:any)=>item.pokemon_id == id)[0].score
          :0
          }</p>
          </div>
          <div className='flex gap-2 justify-end mt-[16px]'>
            {types.map((item) => {
              return (
                <span
                  key={`type-${item.type.name}`}
                  className={`badge-type-${item.type.name} px-[14px] capitalize py-1 rounded-[16px]`}
                >
                  {item.type.name}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
