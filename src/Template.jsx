import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";

export default function Template() {
  return (
    <div>
      <NavbarComponent />

      <div className="px-10">
        <Outlet />
      </div>
    </div>
  );
}