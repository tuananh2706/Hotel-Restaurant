import Logo from "./Logo";
import InputSearch from "../InputSearch";
import HeaderRight from "./headerRight";

function Header() {
  return (
    <header className="h-[88px] flex justify-center shadow-lg">
      <div className="h-[100%] px-10 max-w-[1440px] w-[100%] flex items-center justify-between">
        <Logo />
        <InputSearch
          placeholder="Tìm kiếm thông tin khách sạn..."
          className="w-[425px] h-12"
        />
        <HeaderRight />
      </div>
    </header>
  );
}

export default Header;
