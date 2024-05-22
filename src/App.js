import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Timer from './pages/Timer';
import Candidates from './pages/Candidates';
import Counter from './pages/Counter';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/timer' element={<Timer />} />
        <Route path='/candidates' element={<Candidates />} />
        <Route path='/counter' element={<Counter />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
