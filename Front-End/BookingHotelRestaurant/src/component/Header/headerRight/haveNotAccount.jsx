import { useNavigate } from "react-router-dom";

function HaveNotAccount({ closeDropdown }) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex items-center flex-col justify-between py-10 gap-2">
      <div className="flex flex-col items-center">
        <h5 className="text-xl text-secondary font-medium">
          Bạn chưa đăng nhập
        </h5>
        <p>Vui lòng đăng nhập </p>
        <a
          className="text-senconBlue font-medium cursor-pointer hover:opacity-80 
        transition-all hover:border-b hover:border-seconGray  duration-200"
          onClick={() => {
            navigate("/login");
            closeDropdown();
          }}
        >
          Đăng nhập ngay
        </a>
      </div>
      <div className="flex flex-col items-center gap-1 h-10">
        <p>Bạn chưa có tài khoản ?</p>
        <a
          className="text-secondary font-medium hover:border-b hover:border-seconGray
         hover:opacity-80 transition-all duration-200 cursor-pointer"
          onClick={() => {
            navigate("/register");
            closeDropdown();
          }}
        >
          Đăng ký ngay
        </a>
      </div>
    </div>
  );
}

export default HaveNotAccount;
