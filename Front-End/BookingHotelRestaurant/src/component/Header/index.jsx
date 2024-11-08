import Logo from "./Logo";
import InputSearch from "../inputSearch";
import HeaderRight from "./headerRight";

function Header() {
  return (
    <header className="h-[88px] flex justify-center shadow-lg fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="h-full px-4 md:px-10 lg:max-w-[1440px] w-full flex items-center justify-between">
        <Logo />
        <InputSearch
          placeholder="Tìm kiếm thông tin khách sạn..."
          className="hidden lg:block w-[425px] h-12"
        />
        <HeaderRight />
      </div>
    </header>
  );
}

export default Header;
