import './App.css';
import RatingUI from './components/Rating/rating';
import Calendar from './components/calendar/Calendar';
import AvailabilityTable from "./components/table/AppointmentAvailability";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Meeting from "./components/Room/Meeting";


function App() {
  return (
    <div className="App">
      <Calendar />
     {/* <RatingUI/>

     <BrowserRouter>
        <Routes>
           <Route exact path="/" element={<AvailabilityTable />}   />
           <Route path='/room/:roomId' element={<Meeting />} />
         </Routes>
     </BrowserRouter> */}

    </div>
    
  );


// function App() {
// return(
//   <>
//   
//   </>
// )
}

export default App;
