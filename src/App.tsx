import { Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Store } from './pages/Store';
import { Navbar } from './components/Navbar'

function App() {
  
  return (
    <>
      <Navbar/>
      <div className="flex flex-row justify-center items-center pt-32">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/store' element={<Store />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
