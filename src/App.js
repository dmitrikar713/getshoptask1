import './App.css';
import {BrowserRouter as Router,  Switch,  Route,  Link, BrowserRouter, Routes} from "react-router-dom";
import VideoScreen from './Components/VideoScreen'
import FormScreen from './Components/FormScreen';
import ThankYouScreen from './Components/ThankYouScreen';


import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<VideoScreen />} /> 
        <Route path="/form" element={<FormScreen />} /> 
        <Route path="/thankyou" element={<ThankYouScreen />} /> 
      </Routes>
    </div>
);    
}

export default App;
