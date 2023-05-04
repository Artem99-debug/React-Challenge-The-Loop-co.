import "./App.css";
import HomePage from "../src/pages/home/HomePage";
import MovieDetailsPage from "../src/pages/movie/MovieDetailsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:imdbID" element={<MovieDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
