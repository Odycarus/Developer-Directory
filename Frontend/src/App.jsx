import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DeveloperDetails from "./pages/DeveloperDetails";
import NotFound from "./pages/NotFound";
import Counter from "./components/Counter";
import RubberDuck from "./components/RubberDuck";
import AddDeveloper from "./pages/AddDeveloper";
import EditDeveloper from "./pages/EditDeveloper";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DeleteUser from "./pages/DeleteUser";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
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
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/delete-user"
  element={
    <ProtectedRoute>
      <DeleteUser />
    </ProtectedRoute>
  }
/>
        
        <Route
          path="/add-developer"
          element={
            <ProtectedRoute>
              <AddDeveloper />
            </ProtectedRoute>
          }
        />


        <Route
          path="/developer/:id/edit"
          element={
            <ProtectedRoute>
              <EditDeveloper />
            </ProtectedRoute>
          }
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