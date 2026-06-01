import { Outlet } from "react-router-dom";
import Navbar from "./components/NavbarComponent";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;