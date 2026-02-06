import "./css/App.css"
import MovieCard from "./components/MovieCard"
import Favorites from "./Pages/Favorites";
import Home from "./Pages/Home"
import Login from "./Pages/Login";
import MovieDetails from "./Pages/MovieDetails";
import {Routes, Route} from "react-router-dom"
import NavBar from "./components/NavBar.jsx";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  return (
    <>
    <AuthProvider>
    <MovieProvider>
      <NavBar />
    <main className="main-content">
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
      </Routes>
    </main>
    </MovieProvider>
    </AuthProvider>
      
    </>

  );

}


export default App
