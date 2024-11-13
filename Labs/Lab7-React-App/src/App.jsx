import './App.css';
import Registration from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Help from './components/Help';
import WeatherForecast from './components/WeatherForecast'; // Import the WeatherForecast component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <header></header>
      <nav>
          <ul className="navlist">
              <li><a href="/">Home</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/help">Help</a></li>
          </ul>
      </nav>
      <div className="container">
          <aside className="sidebar">
              <input type="text" className="search" id="search" name="search" placeholder="Search" />
              <WeatherForecast /> {/* Add WeatherForecast component here */}
          </aside>
          <main className="maincontent">
              <BrowserRouter>
                  <Routes>
                      <Route index element={<Home />} />
                      <Route path="register" element={<Registration />} />
                      <Route path="login" element={<Login />} />
                      <Route path="help" element={<Help />} />
                  </Routes>
              </BrowserRouter>
          </main>
      </div>
    </>
  );
}

export default App;
