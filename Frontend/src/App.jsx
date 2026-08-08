import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DeveloperDetails from "./pages/DeveloperDetails";
import NotFound from "./pages/NotFound";
import Counter from "./components/Counter";
import RubberDuck from "./components/RubberDuck";
import AddDeveloper from "./pages/AddDeveloper";
import EditDeveloper from "./pages/EditDeveloper";
import Login from "./pages/Login";


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" 
        element={<Home />} 
        />

        <Route
        path="/login"
        element={<Login />}
        />

        <Route
          path="/developer/:id"
          element={<DeveloperDetails />}
        />
        
        <Route
          path="/counter"
          element={<Counter />}
        />
        <Route
          path="/add-developer"
          element={<AddDeveloper />}
        />
        <Route
          path="/developer/:id/edit"
          element={<EditDeveloper />}
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