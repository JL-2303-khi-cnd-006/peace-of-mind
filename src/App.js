import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './global/Sidebar';
import Home from './pages/home/Home';
import Councler from './pages/councler/Councler';
import Calendar from './pages/calendar/Calendar';
import CounclerProfile from './pages/counclerprofile/CounclerProfile';

import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Sidebar>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/councler' element={<Councler />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/counclerprofile' element={<CounclerProfile/>} />
      </Routes>
    </Sidebar>
  </BrowserRouter>
    </div>
  );
}

export default App;

