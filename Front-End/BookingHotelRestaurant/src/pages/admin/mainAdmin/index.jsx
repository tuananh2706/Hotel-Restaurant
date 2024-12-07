import { Outlet } from "react-router-dom";
import NavbarAdmin from "./navbarAdmin";

function AdminPage() {
  return (
    <div className="w-full">
      <div className="bg-seconGray bg-opacity-5 flex">
        <NavbarAdmin />
        <div className="w-full pl-5 pt-5 pr-20 min-h-[600px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
