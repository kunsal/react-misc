import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';

import Timer from './pages/Timer';
import Candidates from './pages/Candidates';
import Counter from './pages/Counter';
import Question from './pages/Question';
import Exam from './pages/Exam';
import Navbar from './components/Navbar';
import Login from './pages/Login';
 
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='md-6 md-offset-3'>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/timer' element={<Timer />} />
              <Route path='/candidates' element={<Candidates />} />
              <Route path='/counter' element={<Counter />} />
              <Route path='/create-question' element={<Question />} />
              <Route path='/exam' element={<Exam />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      
      </div>
    </BrowserRouter>
  );
}

export default App;
