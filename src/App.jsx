import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DeveloperDetails from "./pages/DeveloperDetails";
import NotFound from "./pages/NotFound";
import Counter from "./components/Counter";
import RubberDuck from "./components/RubberDuck";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/developer/:id"
          element={<DeveloperDetails />}
        />
        
        <Route
          path="/counter"
          element={<Counter />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />


      </Routes>

              <RubberDuck />

    </BrowserRouter>
  );
}


export default App;