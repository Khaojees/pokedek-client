import axios from 'axios'
import { POKEMON_REGISTER,POKEMON_LOGIN,POKEMON_VOTE,POKEMON_SCORE,POKEMON_VOTE_SCORE,POKEMON_DELETE } from '@/utils/constant'
import { handleResponse, IResponse } from '@/utils/handleResponse'
import { useToken } from '@/utils/token'

interface IgetRegister extends IResponse {
      status: number | undefined
      data?: {
            success:boolean,
            data?:any,
            _token?:any
      }
    }


interface Iname {
            firstName?:string, 
            lastName?:string,
            userName:string,
            password:string
      }
interface Ivote {
      "item":[
            {
                "id":Number
            }
        ]
}

export const getRegisterServices = {
  getRegister: async (name: Iname): Promise<IgetRegister> => {
    try {
      const response = await axios.post(`${POKEMON_REGISTER}`,name)
      return handleResponse.success(response)
    } catch (error: any) {
      return handleResponse.error(error)
    }
  },
  getLogin: async (name: Iname): Promise<IgetRegister> => {
      try {
        const response = await axios.post(`${POKEMON_LOGIN}`,name)
        return handleResponse.success(response)
      } catch (error: any) {
        return handleResponse.error(error)
      }
    },
    votePokemon: async (name: Ivote): Promise<IgetRegister> => {
      const { getToken } = useToken()
      try {
        const response = await axios.post(POKEMON_VOTE, name, {
            headers: {
              'Authorization': `Bearer ${getToken()}`
            },
          })
        return handleResponse.success(response)
      } catch (error: any) {
        return handleResponse.error(error)
      }
    },
    getScore: async (): Promise<IgetRegister> => {
      const { getToken } = useToken()
      try {
        const response = await axios.get(POKEMON_SCORE, {
            headers: {
              'Authorization': `Bearer ${getToken()}`
            },
          })
        return handleResponse.success(response)
      } catch (error: any) {
        return handleResponse.error(error)
      }
    },
    getVoteScore: async (): Promise<IgetRegister> => {
      const { getToken } = useToken()
      try {
        const response = await axios.get(POKEMON_VOTE_SCORE, {
            headers: {
              'Authorization': `Bearer ${getToken()}`
            },
          })
        return handleResponse.success(response)
      } catch (error: any) {
        return handleResponse.error(error)
      }
    },
    deleteVote: async (id:any): Promise<IgetRegister> => {
      const { getToken } = useToken()
      try {
        const response = await axios.delete(`${POKEMON_DELETE}/${id}`, {
            headers: {
              'Authorization': `Bearer ${getToken()}`
            },
          })
        return handleResponse.success(response)
      } catch (error: any) {
        return handleResponse.error(error)
      }
    },
}
