import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/authContext";
import Title from "../../../../component/text/titleCategory";
import { useGlobalContext } from "../../../../context";
import EditIcon from "../../../../assets/icons/edit";
import TrashIcon from "../../../../assets/icons/trashIcon";
import Button from "../../../../component/myButton";
import Modal from "../../../../component/myModal";
import InputDynamic from "../../../../component/inputDynamic";

function Accounts() {
  const [accountList, setAccountList] = useState([]);
  const [openFormCreate, setOpenFormCreate] = useState(false);
  const [flag, setFlag] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [opentDelete, setOpentDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const [createFrom, setCreateFrom] = useState({
    accountName: "",
    email: "",
    password: "",
    checkPassword: "",
    firstName: "",
    lastName: "",
    role: "",
  });
  const [editForm, setEditForm] = useState(null);
  const {
    removeAccount,
    fetchAccounts,
    registerAccountAdmin,
    register,
    changeInformationsUser,
  } = useAuth();
  const { formatDate2 } = useGlobalContext();

  const handleChangeCreate = (e) => {
    setCreateFrom((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseCreate = () => {
    setCreateFrom({
      accountName: "",
      email: "",
      password: "",
      checkPassword: "",
      firstName: "",
      lastName: "",
      role: "",
    });
    setOpenFormCreate(false);
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const { role, ...rest } = createFrom;
    console.log("role", role);
    console.log("createFrom", rest);
    if (role === "admin") {
      const response = await registerAccountAdmin(rest);
      if (response) {
        handleCloseCreate();
        setFlag(!flag);
      }
    }
    if (role === "user") {
      const response = await register({
        userName: rest.accountName,
        email: rest.email,
        password: rest.password,
        firstName: rest.firstName,
        lastName: rest.lastName,
      });
      if (response) {
        setOpenFormCreate(false);
        setFlag(!flag);
      }
    }
  };

  const openModalEdit = (item) => {
    setEditForm(item);
    setOpenFormEdit(true);
  };

  const closeModalEdit = () => {
    setEditForm(null);
    setOpenFormEdit(false);
  };

  const handleChangeEdit = (e) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const { accountName, createdAt, role, ...rest } = editForm;
    const response = await changeInformationsUser(rest, accountName);
    if (response) {
      closeModalEdit();
      setFlag(!flag);
    }
  };

  const openModalDelete = (item) => {
    setOpentDelete(true);
    setSelected(item);
  };

  const closeModalDelete = () => {
    setOpentDelete(false);
    setSelected(null);
  };

  const handleRemoveAccount = async () => {
    const response = await removeAccount(selected);
    if (response) {
      closeModalDelete();
      setFlag(!flag);
    }
  };

  const tableTheadCss =
    "px-4 py-2 border border-gray-300 shadow font-medium bg-white";
  const tableTbodyCss =
    "px-4 py-2 border border-gray-300 text-sm text-gray-700 text-center";
  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const response = await fetchAccounts();
        setAccountList(response);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    fetchAllAccounts();
  }, [flag]);

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-[300px]">
        <Title className={"text-3xl"}>Account Management</Title>
        <p className=" italic">(Quản lý tài khoản)</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setOpenFormCreate(true)}
          className="px-5 py-2 border rounded-lg text-white font-medium transition-all duration-300
        bg-gradient-to-r from-[#00854A] via-[#02AC62] to-[#0CD27B] hover:bg-clip-text hover:text-transparent
         hover:bg-white hover:border-secondary active:scale-95"
        >
          Tạo tài khoản
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className={`${tableTheadCss}`}>Tên tài khoản</th>
            <th className={`${tableTheadCss}`}>Họ và tên</th>
            <th className={`${tableTheadCss}`}>Email</th>
            <th className={`${tableTheadCss}`}>SĐT</th>
            <th className={`${tableTheadCss}`}>DOB</th>
            <th className={`${tableTheadCss}`}>Quốc tịch</th>
            <th className={`${tableTheadCss}`}>Chức vụ</th>
            <th className={`${tableTheadCss}`}>Ngày tạo</th>
            <th className={`${tableTheadCss}`}>Action</th>
          </tr>
        </thead>
        <tbody className="max-h-[350px] overflow-y-auto">
          {accountList?.length > 0 ? (
            accountList.map((account) => (
              <tr
                className="bg-white hover:bg-seconGray hover:bg-opacity-20 transition-colors duration-100"
                key={account.accountName}
              >
                <td className={`${tableTbodyCss}`}>{account.accountName}</td>
                <td
                  className={`${tableTbodyCss}`}
                >{`${account.firstName} ${account.lastName}`}</td>
                <td className={`${tableTbodyCss}`}>{account.email}</td>
                <td className={`${tableTbodyCss}`}>
                  {(account.phone && account.phone) || "-"}
                </td>
                <td className={`${tableTbodyCss}`}>
                  {(account.birthDate && formatDate2(account.birthDate)) || "-"}
                </td>
                <td className={`${tableTbodyCss}`}>
                  {(account.nationality && account.nationality) || "-"}
                </td>
                <td className={`${tableTbodyCss}`}>{account.role}</td>
                <td className={`${tableTbodyCss}`}>
                  {formatDate2(account.createdAt)}
                </td>
                <td className={`${tableTbodyCss} `}>
                  <div className="flex gap-3 items-center justify-center">
                    <button
                      onClick={() => openModalEdit(account)}
                      className="hover:translate-y-[-1px] transition-all duration-200 active:scale-90"
                    >
                      <EditIcon size="18" />
                    </button>
                    <button
                      onClick={() => openModalDelete(account.accountName)}
                      className="hover:translate-y-[-1px] transition-all duration-200 active:scale-90"
                    >
                      <TrashIcon color="#dc2626" size="18" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Create */}
      <Modal
        isOpen={openFormCreate}
        onClose={handleCloseCreate}
        className={"pb-10"}
        title="Tạo tài khoản mới"
      >
        <div>
          <h5 className=" text-secondary font-medium my-5">
            Vui lòng nhập những thông tin bên dưới
          </h5>
          <div className="px-5">
            <InputDynamic
              type="text"
              label={"Tên tài khoản"}
              value={createFrom.accountName}
              onChange={handleChangeCreate}
              name={"accountName"}
              id={"accountName"}
            />
            <InputDynamic
              type="email"
              label={"Email"}
              value={createFrom.email}
              onChange={handleChangeCreate}
              name={"email"}
              id={"email"}
            />
            <div className="flex gap-5">
              <InputDynamic
                type="text"
                label={"Họ"}
                value={createFrom.firstName}
                onChange={handleChangeCreate}
                name={"firstName"}
                id={"firstName"}
              />
              <InputDynamic
                type="text"
                label={"Tên"}
                value={createFrom.lastName}
                onChange={handleChangeCreate}
                name={"lastName"}
                id={"lastName"}
              />
            </div>
            <InputDynamic
              type="password"
              label={"Nhập mật khẩu"}
              value={createFrom.password}
              onChange={handleChangeCreate}
              name={"password"}
              id={"password"}
            />
            <InputDynamic
              type="password"
              label={"Nhập lại mật khẩu"}
              value={createFrom.checkPassword}
              onChange={handleChangeCreate}
              name={"checkPassword"}
              id={"checkPassword"}
            />
            <select
              name="role"
              id="role"
              value={createFrom.role}
              onChange={handleChangeCreate}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none 
              focus:ring-1 focus:ring-secondary focus:border-seconring-secondary"
            >
              <option value="">--Vui lòng chọn role của tài khoản--</option>
              <option value="admin">Admin</option>
              <option value="subAdmin">Chủ khách sạn</option>
              <option value="user">Khách hàng</option>
            </select>
          </div>
          <div className="flex justify-end gap-5 mt-5">
            <button
              onClick={handleCloseCreate}
              className="py-1 px-5 border bg-seconGray font-medium text-black rounded-md 
            hover:opacity-80 transition-all duration-200 active:scale-95"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmitCreate}
              className="py-2 px-5 border bg-secondary text-white font-medium rounded-md 
            hover:opacity-80 transition-all duration-200 active:scale-95"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>
      {/* Modal Edit */}
      <Modal
        isOpen={openFormEdit}
        onClose={closeModalEdit}
        title="Chỉnh sửa thông tin khách hàng"
      >
        {editForm && (
          <div>
            <h5 className=" text-secondary font-medium my-5">
              Vui lòng nhập những thông tin thay đổi bên dưới
            </h5>
            <div className="px-5">
              <InputDynamic
                type="text"
                label={"Email"}
                value={editForm.email}
                onChange={handleChangeEdit}
                name={"email"}
                id={"email"}
              />
              <InputDynamic
                type="text"
                label={"Quốc Tịch"}
                value={editForm.nationality}
                onChange={handleChangeEdit}
                name={"nationality"}
                id={"nationality"}
              />
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={() => setOpenFormEdit(false)}
                className="py-1 px-5 border bg-seconGray font-medium text-black rounded-md 
            hover:opacity-80 transition-all duration-200 active:scale-95"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitEdit}
                className="py-2 px-5 border bg-secondary text-white font-medium rounded-md 
            hover:opacity-80 transition-all duration-200 active:scale-95"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}
      </Modal>
      {/* Modal Delete */}
      <Modal
        isOpen={opentDelete}
        onClose={closeModalDelete}
        className={"w-[400px]"}
      >
        {selected && (
          <div>
            <h5 className="text-xl text-primary">
              Bạn thực sự muốn xóa tài khoản "
              <span className="text-danger">{selected}</span>"
            </h5>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={closeModalDelete}
                className="py-1 px-5 border bg-seconGray font-medium text-black rounded-md 
            hover:opacity-80 transition-all duration-200 active:scale-95"
              >
                Hủy
              </button>
              <button
                onClick={handleRemoveAccount}
                className="py-2 px-5 border bg-secondary text-white font-medium rounded-md 
            hover:opacity-80 transition-all duration-200 active:scale-95"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Accounts;
