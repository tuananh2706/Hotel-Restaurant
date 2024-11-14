import { useEffect, useState } from "react";
import Input from "../../../component/inputSearch";
import Button from "../../../component/myButton";
import Title from "../../../component/text/titleCategory";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";

function ChangeInformations() {
  const { user, changeInformationsUser } = useAuth();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    avatarUrl: "",
    birthDate: null,
    nationality: "",
  });

  useEffect(() => {
    if (user) {
      setAccount({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        avatarUrl: user.avatarUrl || "",
        birthDate: user.birthDate || null,
        nationality: user.nationality || "",
      });
    }
  }, [user]);

  const handleChangeValue = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (account.birthDate) {
      const selectDate = new Date(account.birthDate);
      const formattedBirthDate = {
        year: selectDate.getFullYear(),
        month: selectDate.getMonth() + 1,
        day: selectDate.getDate(),
        dayOfWeek: selectDate.getDay(),
      };

      setAccount({
        ...account,
        birthDate: formattedBirthDate,
      });

      const response = await changeInformationsUser(account);
      if (response) {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="p-2 lg:p-2 flex flex-col gap-8">
      <Title className={"text-[28px] font-medium text-center lg:text-left"}>
        Thay đổi thông tin cá nhân
      </Title>
      <div className="bg-white px-4 py-6 h-[400px] rounded flex items-start justify-center lg:justify-start">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 w-full gap-x-4 gap-y-2"
        >
          <div>
            <label htmlFor="firstName">Họ</label>
            <Input
              className={"mt-2"}
              icon={false}
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Nguyễn"
              value={account.firstName}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="lastName">Tên</label>
            <Input
              className={"mt-2"}
              icon={false}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Văn A"
              value={account.lastName}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="birthDate">Ngày sinh nhật</label>
            <Input
              icon={false}
              type="date"
              id="birthDate"
              name="birthDate"
              placeholder="vui lòng dán link avt của bạn"
              value={account.birthDate ? account.birthDate : ""}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="email">Địa chỉ Email</label>
            <Input
              className={"mt-2"}
              icon={false}
              type="email"
              id="email"
              name="email"
              placeholder="Example@gmail.com"
              value={account.email}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="phone">Số điện thoại</label>
            <Input
              className={"mt-2"}
              icon={false}
              type="number"
              id="phone"
              name="phone"
              placeholder="089xxxxxx"
              value={account.phone}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="avatarUrl">Avatar</label>
            <Input
              className={"mt-2"}
              icon={false}
              type="text"
              id="avatarUrl"
              name="avatarUrl"
              placeholder="vui lòng dán link avt của bạn"
              value={account.avatarUrl}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <label htmlFor="nationality">Quốc tịch</label>
            <Input
              icon={false}
              type="text"
              id="nationality"
              name="nationality"
              placeholder="Việt nam"
              value={account.nationality}
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex items-end justify-start">
            <Button variant="secondary" type="submit">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeInformations;
