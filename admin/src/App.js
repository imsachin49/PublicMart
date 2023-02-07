import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import New from './pages/new/New';
import Single from './pages/single/Single';
import List from './pages/list/List';
import { productInputs,userInputs } from './FormSource';
import './styles/dark.scss'

function App() {
  return (
    <div className="App dark">
    <Router>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      
      <Route path='/users' element={<List />} />
      <Route path='/users/:userId' element={<Single />} />
      <Route path='users/new' element={<New inputs={userInputs} title="Add New User"/>} />

      <Route path='/products' element={<List />} />
      <Route path='/products/:productId' element={<Single />} />
      <Route path='products/new' element={<New inputs={productInputs} title="Add New Product" />} />
      
    </Routes>
    </Router>
    </div>
  );
}

export default App;
