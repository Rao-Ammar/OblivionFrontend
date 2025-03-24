import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Verify from './pages/Verify'
import { UserData } from './context/UserContext'
import { LoadingBig } from './components/Loading'

function App() {

  const {user, isAuth, Loading} = UserData()

  return (
    <>
    {Loading? (<LoadingBig/>):(<BrowserRouter>
    <Routes>
      <Route path='/' element={isAuth ? <Home/> : <Login/>}/>
      <Route path='/login' element={isAuth ? <Home/> : <Login/>}/>
      <Route path='verify/' element={isAuth ? <Home/> : <Verify/>}/>
    </Routes>
    
    </BrowserRouter>)}
    
    </>
  )
}

export default App