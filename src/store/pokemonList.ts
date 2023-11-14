import { create } from 'zustand'
import { IPokemonDetailResponse } from '@/interface/pokemonDetail'

const initStore = {
  pokemon: {
    data: [],
    loading: false,
    error: null,
  },
  fetchPokemon: {
    data: [],
    loading: false,
    error: null,
  },
}

type pokemonType = {
  data: IPokemonDetailResponse[]
  loading: boolean
  error: null | any
}

type UsePokemonListStoreType = {
  pokemon: pokemonType
  fetchPokemon: pokemonType,
  setPokemonList: (value: pokemonType) => void,
  setFetchPokemonList: (value: pokemonType) => void,
  clearPokemon: () => void,
}

export const usePokemonListStore = create<UsePokemonListStoreType>((set) => ({
  ...initStore,
  setPokemonList: (value: pokemonType) => set({ pokemon: value }),
  setFetchPokemonList: (value: pokemonType) => set({ fetchPokemon: value }),
  clearPokemon: () => set({ ...initStore }),
}))


type loginType = {
  login: boolean,
  setLogin: (value: boolean) => void
}

export const loginStore = create<loginType>((set) => ({
  login:true,
  setLogin: (value: boolean) => set({login:value}),
}))


// const [voteData,setVoteData] = useState([])
interface IvoteData {
  id: number
  pokemon_id: string
  user_uuid: string
  create_date: string
  create_by: string
}
type voteDataType = {
  voteData: IvoteData[],
  setVoteData: (value: IvoteData[]) => void
}

export const voteDataStore = create<voteDataType>((set) => ({
  voteData:[],
  setVoteData: (value: IvoteData[]) => set({voteData:value}),
}))


// const [score,setScore] = useState([])

interface Iscore {
  pokemon_id: string
  score: string
}

type scoreType = {
  score: Iscore[],
  setScore: (value: Iscore[]) => void
}

export const scoreStore = create<scoreType>((set) => ({
  score:[],
  setScore: (value: Iscore[]) => set({score:value}),
}))




