import { motion, AnimatePresence } from "framer-motion";
import Input from "../../component/inputSearch";
import Title from "../../component/text/titleCategory";
import bannerRegister from "../../assets/img/bannerRegister.jpg";
import Button from "../../component/myButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDelayedRender from "../../hook/useDelayedRender";
import GmailIcon from "../../assets/icons/social/gmailIcon";
import FbIcon from "../../assets/icons/social/fbIcons";
import GmailNegative from "../../assets/icons/social/gmailNegative";
import FbNegative from "../../assets/icons/social/fbNegative";
import useScreenWithResize from "../../hook/useScreenWithResize";
import { useAuth } from "../../context/authContext";

function RegisterPage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const isLoaded = useDelayedRender();
  const [toggleGmail, setToggleGmail] = useState(false);
  const [toggleFB, setToggleFB] = useState(false);
  const screenWidth = useScreenWithResize();
  const isTablet = screenWidth <= 1024;
  const [registerRequest, setRegisterRequest] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { register } = useAuth();

  if (!isLoaded) return null;

  // Cấu hình cho hiệu ứng
  const slideInVariants = {
    initial: { x: "50%", opacity: 0 }, // Bắt đầu từ bên phải ngoài màn hình
    animate: { x: 0, opacity: 1 }, // Vào giữa màn hình
    exit: { x: "50%", opacity: 0 }, // Trôi về bên trái ngoài màn hình
  };

  const slideInvariantImg = {
    initial: { x: "-50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-50%", opacity: 0 },
  };

  // Hàm điều hướng sau khi animation hoàn tất
  const handleNavigate = (path) => {
    setIsExiting(true); // Đặt trạng thái thoát để bắt đầu animation thoát
    setTimeout(() => {
      navigate(path); // Điều hướng sau khi animation hoàn tất
    }, 1000); // 1000ms tương ứng với `duration` trong `transition`
  };

  const handleChangeValue = (e) => {
    setRegisterRequest({
      ...registerRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completed = await register(registerRequest);
    if (completed) {
      navigate("/login");
    }
  };

  return (
    <div className="w-full lg:w-[1360px] mt-5 rounded-xl mb-10 h-[600px] bg-white flex justify-between shadow">
      {/* Sử dụng animatePresence để quản lý việc hiệu ứng exit sẽ được chạy trước khi xóa khỏi dom */}
      {/* Form */}
      <AnimatePresence>
        {/* Trạng thái này để xác định đang chạy exit animation */}
        {!isExiting && (
          <motion.div
            className="flex items-center justify-center w-full"
            variants={slideInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className=" w-[300px] md:w-[404px] h-[520px] flex flex-col justify-between">
              <Title className={"text-[26px] md:text-[32px] uppercase"}>
                Bắt đầu với chúng tôi
              </Title>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="userName"
                    className="text-base font-medium text-primary"
                  >
                    Tên đăng nhập
                  </label>
                  <Input
                    id="userName"
                    type="text"
                    name="userName"
                    icon={false}
                    placeholder="Nhập tên đăng nhập"
                    value={registerRequest.userName}
                    onChange={handleChangeValue}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-primary"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    icon={false}
                    placeholder="Nhập email"
                    value={registerRequest.email}
                    onChange={handleChangeValue}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-primary"
                  >
                    Mật khẩu
                  </label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    icon={false}
                    placeholder="Nhập mật khẩu"
                    onChange={handleChangeValue}
                  />
                </div>
                <Button variant="secondary" type="submit" className={"w-full"}>
                  Đăng ký
                </Button>
              </form>
              <div className="pt-8">
                <div className="flex flex-col items-center">
                  {/* <span className="italic text-seconGray">Đăng nhập bằng:</span> */}
                  <div className="flex gap-6">
                    <a
                      className="flex items-center justify-center w-12 h-12 border border-transparent p-2 rounded-full hover:border-seconGray cursor-pointer hover:bg-seconGray hover:bg-opacity-20 transition-all"
                      style={{ width: "48px", height: "48px" }}
                      onMouseEnter={() => setToggleGmail(true)}
                      onMouseLeave={() => setToggleGmail(false)}
                    >
                      {toggleGmail ? (
                        <GmailIcon size="36" />
                      ) : (
                        <GmailNegative size="36" />
                      )}
                    </a>
                    <a
                      className="flex items-center justify-center w-12 h-12 border border-transparent p-2 rounded-full hover:border-seconGray cursor-pointer hover:bg-seconGray hover:bg-opacity-20 transition-all"
                      style={{ width: "48px", height: "48px" }}
                      onMouseEnter={() => setToggleFB(true)}
                      onMouseLeave={() => setToggleFB(false)}
                    >
                      {toggleFB ? (
                        <FbIcon size="36" />
                      ) : (
                        <FbNegative size="36" />
                      )}
                    </a>
                  </div>
                </div>
                <p className="text-center">
                  Bạn đã có tài khoản?{" "}
                  <a
                    className="text-senconBlue font-medium btn cursor-pointer"
                    onClick={() => handleNavigate("/login")}
                  >
                    Đăng nhập ngay
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Banner */}
      {!isTablet && (
        <AnimatePresence>
          {!isExiting && (
            <motion.div
              className="w-full"
              variants={slideInvariantImg}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={bannerRegister}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default RegisterPage;
