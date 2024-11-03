import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";

function PageLayout() {
  return (
    <>
      <Header />
      <div className="bg-slate-100 mt-[88px] flex justify-center ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default PageLayout;
