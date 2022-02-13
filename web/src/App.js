import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import "./Layout.css";
import 'rsuite/dist/rsuite.min.css';

import Home from './Home';
import NoPage from './NoPage';
import About from './About';
import Charts from './Charts';
import Requests from './Requests';
import Chart from './Chart';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/charts" element={<Charts />} />
          <Route exact path="/requests" element={<Requests />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/chart/:uuid" element={<Chart />} />
          <Route exact path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
