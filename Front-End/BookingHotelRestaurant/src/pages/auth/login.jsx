import { motion, AnimatePresence } from "framer-motion";
import Input from "../../component/inputSearch";
import Title from "../../component/text/titleCategory";
import bannerLogin from "../../assets/img/bannerLogin.jpg";
import Button from "../../component/myButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useDelayedRender from "../../hook/useDelayedRender";
import GmailIcon from "../../assets/icons/social/gmailIcon";
import FbIcon from "../../assets/icons/social/fbIcons";
import GmailNegative from "../../assets/icons/social/gmailNegative";
import FbNegative from "../../assets/icons/social/fbNegative";
import Modal from "../../component/myModal";
import useScreenWithResize from "../../hook/useScreenWithResize";
import { useAuth } from "../../context/authContext";

function LoginPage() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const isLoaded = useDelayedRender();
  const [toggleGmail, setToggleGmail] = useState(false);
  const [toggleFB, setToggleFB] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const screenWidth = useScreenWithResize();
  const isTablet = screenWidth <= 1024;
  const [loginRequest, setLoginRequest] = useState({
    emailOrUserName: "",
    password: "",
  });
  const { login, user, isHavedAccount } = useAuth();

  if (!isLoaded) return null;

  // Cấu hình cho hiệu ứng
  const slideInVariants = {
    initial: { x: "-50%", opacity: 0 }, // Bắt đầu từ bên phải ngoài màn hình
    animate: { x: 0, opacity: 1 }, // Vào giữa màn hình
    exit: { x: "-50%", opacity: 0 }, // Trôi về bên trái ngoài màn hình
  };

  const slideInvariantImg = {
    initial: { x: "50%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "50%", opacity: 0 },
  };

  // Hàm điều hướng sau khi animation hoàn tất
  const handleNavigate = (path) => {
    setIsExiting(true); // Đặt trạng thái thoát để bắt đầu animation thoát
    setTimeout(() => {
      navigate(path); // Điều hướng sau khi animation hoàn tất
    }, 1000); // 1000ms tương ứng với `duration` trong `transition`
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completed = await login(loginRequest);
    if (completed) {
      navigate("/");
    }
  };

  return (
    <div className=" w-full lg:w-[1360px] mt-5 rounded-xl mb-10 h-[600px] bg-white flex justify-between shadow">
      {!isTablet && (
        <AnimatePresence>
          {!isExiting && (
            <motion.div
              className="w-full relative z-20"
              variants={slideInvariantImg}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={bannerLogin}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Sử dụng animatePresence để quản lý việc hiệu ứng exit sẽ được chạy trước khi xóa khỏi dom */}
      <AnimatePresence>
        {/* Trạng thái này để xác định đang chạy exit animation */}
        {!isExiting && (
          <motion.div
            className="flex items-center justify-center w-full relative z-10"
            variants={slideInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="w-[350px] md:w-[404px] h-[520px] flex flex-col justify-between">
              <div>
                <Title className={"text-[26px] md:text-[32px] uppercase"}>
                  Chào mừng bạn trở lại
                </Title>
                <p className="text-secondary">
                  Đăng nhập bằng tài khoản của bạn!
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="emailOrUserName"
                    className="text-base font-medium text-primary"
                  >
                    Tên đăng nhập/Emai
                  </label>
                  <Input
                    id="userName"
                    type="text"
                    name="emailOrUserName"
                    icon={false}
                    value={loginRequest.emailOrUserName}
                    onChange={(e) =>
                      setLoginRequest({
                        ...loginRequest,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className={"mt-2"}
                    placeholder="Nhập tên đăng nhập/Email"
                  />
                </div>
                <div>
                  <div className="flex justify-between w-full">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-primary"
                    >
                      Mật khẩu
                    </label>
                    <a
                      className="btn text-senconBlue font-medium cursor-pointer"
                      onClick={() => setIsOpenModal(true)}
                    >
                      Quên mật khẩu
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={loginRequest.password}
                    onChange={(e) =>
                      setLoginRequest({
                        ...loginRequest,
                        [e.target.name]: e.target.value,
                      })
                    }
                    icon={false}
                    className={"mt-2"}
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <Button variant="secondary" type="submit" className={"w-full"}>
                  Đăng Nhập
                </Button>
              </form>
              <div className="pt-8 border-t border-seconGray">
                <div className="flex flex-col items-center">
                  <span className="italic text-seconGray">Đăng nhập bằng:</span>
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
                  Bạn chưa có tài khoản?{" "}
                  <a
                    className="text-senconBlue font-medium btn cursor-pointer"
                    onClick={() => handleNavigate("/register")}
                  >
                    Đăng ký ngay
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        closeBtn
        title="Forget Password"
        className={"w-2/3 lg:w-1/3"}
      >
        <form>
          <label htmlFor="email">Vui lòng nhập email/userName của bạn: </label>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 my-2 mt-4 lg:mt-0">
            <Input
              className={"w-full"}
              type="text"
              name="emailOrUserName"
              id="emailOrUserName"
              icon={false}
              placeholder="example@example.com / example"
            />
            <Button variant="outline" className={"w-full lg:w-20 text-xs"}>
              Gửi
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default LoginPage;
