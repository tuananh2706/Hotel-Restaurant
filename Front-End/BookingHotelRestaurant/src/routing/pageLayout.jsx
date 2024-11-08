import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import BackToTop from "../component/backToTopBtn";

function PageLayout() {
  return (
    <>
      <Header />
      <div className="bg-slate-100 mt-[88px] flex justify-center ">
        <Outlet />
        <BackToTop />
      </div>
      <Footer />
    </>
  );
}

export default PageLayout;
