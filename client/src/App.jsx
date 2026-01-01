import React,{lazy} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

const Home = lazy(()=> import('./pages/Home'))
const Login = lazy(()=> import('./pages/Login'))
const Chart = lazy(()=> import('./pages/Chart'))
const  Group = lazy(()=> import('./pages/Group'))

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/chart/:chatId' element={<Chart/>}/>
      <Route path='/group' element={<Group/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App