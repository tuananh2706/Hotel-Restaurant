import Logo from "./Logo";
import InputSearch from "../inputSearch";
import HeaderRight from "./headerRight";

function Header() {
  return (
    <header className="h-[88px] flex justify-center shadow-lg fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="h-[100%] px-10 lg:max-w-[1440px] w-[100%] flex items-center justify-between">
        <Logo />
        <InputSearch
          placeholder="Tìm kiếm thông tin khách sạn..."
          className="w-[425px] h-12 opacity-0 md:opacity-0 lg:opacity-100"
        />
        <HeaderRight />
      </div>
    </header>
  );
}

export default Header;
