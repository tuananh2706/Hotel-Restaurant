import { useState } from "react";
import Input from "../../../component/inputSearch";
import Button from "../../../component/myButton";
import Title from "../../../component/text/titleCategory";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [changeRequest, setChangeRequest] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChangeValue = (e) => {
    setChangeRequest({
      ...changeRequest,
      [e.target.name]: e.target.value,
    });
  };
  const { changePasswordUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completed = await changePasswordUser(changeRequest);
    if (completed) {
      console.log("thay đổi mật khẩu thành công");
      navigate("/profile");
    }
  };
  return (
    <div className="p-2 lg:p-2 flex flex-col gap-8">
      <Title className={"text-[28px] font-medium text-center lg:text-left"}>
        Thay đổi mật khẩu
      </Title>
      <div className="bg-white px-4 py-6 h-[400px] rounded flex items-start justify-center lg:justify-start">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between h-full gap-4 w-1/2"
        >
          <div>
            <label htmlFor="oldPassword" className="text-primary text-base">
              Nhập mật khẩu cũ:{" "}
            </label>
            <Input
              icon={false}
              id="oldPassword"
              name="oldPassword"
              className={"mt-2"}
              placeholder="Nhập lại mật khẩu cũ ..."
              type="password"
              value={changeRequest.oldPassword}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="text-primary text-base">
              Nhập mật khẩu mới:
            </label>
            <Input
              icon={false}
              id="newPassword"
              name="newPassword"
              className={"mt-2"}
              placeholder="Nhập mật khẩu mới ..."
              type="password"
              value={changeRequest.newPassword}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-primary text-base">
              Nhập lại mật khẩu mới:{" "}
            </label>
            <Input
              icon={false}
              id="confirmPassword"
              name="confirmPassword"
              className={"mt-2"}
              placeholder="Nhập lại mật khẩu cũ ..."
              type="password"
              value={changeRequest.confirmPassword}
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button variant="secondary" className={"w-1/2"}>
              Thay đổi mật khẩu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
