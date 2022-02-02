import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,  Switch,  Route,  Link, BrowserRouter, Routes} from "react-router-dom";
import VideoScreen from './Components/VideoScreen'
import FormScreen from './Components/FormScreen';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<VideoScreen />} /> 
        <Route path="/form" element={<FormScreen />} /> 
      </Routes>
    </div>
  );
}

export default App;
