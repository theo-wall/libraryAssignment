import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    // router for navigation of pages all elements wrapped in the navigation bar component for easy navigation
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar children={<HomePage />} />} />
        <Route
          path="/add-book"
          element={<NavBar children={<CreatePage />} />}
        />
        <Route
          path="/add-book/:id"
          element={<NavBar children={<CreatePage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
