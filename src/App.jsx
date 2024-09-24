import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import NewsList from './components/NewList'


function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<NewsList/>} />
      </Routes>
     </Router>
    </>
  )
}

export default App
