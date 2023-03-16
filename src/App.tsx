import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { increment, decrement, incrementByAmount } from './counterSlice'
import { pokemonApi, useGetPokemonByNameQuery, useLazyGetPokemonByNameQuery } from './pokemonApi'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
 

  const [inputData, setInputData] = useState<number>(0)
  const [pokemonName, setPokemonName] = useState<string>('')
  const [currentPokemon, setCurrentPokemon] = useState("")
  // const count = useAppSelector((state) => state.counter.value)
  const {data, error, isLoading, refetch} = useGetPokemonByNameQuery('')
  const [trigger, result, lastPromiseInfo] = useLazyGetPokemonByNameQuery()
 
  const dispatch = useAppDispatch()
  
  const searchPokemon = async (name: string) => {
  let pokeInfo = await trigger(name, false)
   //test push
   setCurrentPokemon(pokeInfo.data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"] );
  }

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input
        type='text'
        onChange={(e) => setInputData(Number(e.target.value))}
      />
      <div className='card'>
        <button onClick={() => dispatch(incrementByAmount(inputData))}>
          increase by set amount
        </button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(increment())}>increment</button>
        {/* <div>{count}</div> */}
        <p>
          {error ? (
            <>oh no got error</>
          ) : isLoading ? (
            <>...loading</>
          ) : data ? (
            <>
              <img
                src={currentPokemon}
              ></img>
            </>
          ) : null}
        </p>
      </div>
      <input type='text' onChange={(e) => setPokemonName(e.target.value)} />
      <button onClick={() => searchPokemon(pokemonName)}></button>
    </div>
  );
}

export default App
