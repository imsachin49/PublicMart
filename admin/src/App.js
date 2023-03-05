import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import New from './pages/new/New';
import Single from './pages/single/Single';
import List from './pages/list/List';
import { productInputs,userInputs } from './FormSource';

function App() {
  const admin=(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.user.isAdmin);
  console.log(admin)
  return (
    <Router>
    <Routes>
      
      <Route path='/login' element={<Login />} />
      { !admin && 
      <>
        <Route path="/" element={<Home />} />
        <Route path='/users' element={<List />} />
        <Route path='/users/:userId' element={<Single />} />
        <Route path='users/new' element={<New inputs={userInputs} title="Add New User"/>} />

        <Route path='/products' element={<List />} />
        <Route path='/products/:productId' element={<Single />} />
        <Route path='products/new' element={<New inputs={productInputs} title="Add New Product" />} />
      </>
      }
      
    </Routes>
    </Router>
  );
}

export default App;
