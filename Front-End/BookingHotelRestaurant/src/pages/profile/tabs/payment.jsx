import { useEffect, useState } from "react";
import Title from "../../../component/text/titleCategory";
import Input from "../../../component/inputSearch";
import Button from "../../../component/myButton";
import PaymentcardIcon from "../../../assets/icons/paymentcard";
import ArrowUpIcon from "../../../assets/icons/arrowUpIcon";
import ArrDownIcon from "../../../assets/icons/arrowDownIcon";
import { useAuth } from "../../../context/authContext";

function Payment() {
  const [toggleVisa, settoggleVisa] = useState(false);
  const [toggleOther, setToggleOther] = useState(false);

  const { bankCardUser, handleChangeBankCard } = useAuth();
  const [bankCardPayload, setBankCardPayload] = useState({});

  useEffect(() => {
    if (bankCardUser) {
      setBankCardPayload(bankCardUser[0]);
    } else {
      setBankCardPayload({
        bankCardId: null,
        bankCardName: "",
        cardNumber: "",
        expirationDate: Date.now(),
        cgv: 0,
        cardType: "VISA",
      });
    }
  }, [bankCardUser]);


  function validatePassword(event) {
    const value = event.target.value.replace(/[^0-9]/g, ""); 
    if (value.length > 3) {
      event.target.value = value.slice(0, 3);
    }


    setBankCardPayload((prev) => ({
      ...prev,
      cgv: event.target.value,
    }));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setBankCardPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleChangeBankCard(bankCardPayload);
      console.log(response);
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
            
    }
  };

  return (
    <div className="p-2 lg:p-2 flex flex-col gap-8">
      <Title className={"text-[28px] font-medium text-center lg:text-left"}>
        Quản lý phương thức thanh toán
      </Title>

      {/* Visa Payment */}
      <div
        className={`bg-white rounded-xl transition-all duration-500 ease-in-out ${
          toggleVisa ? "h-[316px]" : "h-[60px]"
        } flex flex-col gap-4 p-5 overflow-hidden`}
      >
        <a
          onClick={() => {
            settoggleVisa((prev) => !prev);
            setToggleOther(false);
          }}
          className="w-full cursor-pointer flex gap-2 items-center relative active:opacity-70 transition-opacity duration-150"
        >
          <PaymentcardIcon size="20" />
          <p className="text-base text-gray-800 ">Thẻ tín dụng / thẻ ghi nợ</p>
          <div className="absolute right-0">
            {toggleVisa ? <ArrowUpIcon size="20" /> : <ArrDownIcon size="20" />}
          </div>
        </a>
        {toggleVisa && (
          <form action="#" className="flex flex-col gap-4">
            <Input
              icon={false}
              name="bankCardName"
              value={bankCardPayload.bankCardName}
              placeholder="Nhập tên của bạn"
              type="text"
              onChange={handleInputChange}
            />
            <Input
              icon={false}
              name="cardNumber"
              value={bankCardPayload.cardNumber}
              type="number"
              placeholder="Nhập số thẻ"
              onChange={handleInputChange}
            />
            <div className="flex w-full gap-4">
              <Input
                type="password"
                maxLength="3"
                placeholder="CVV"
                name="cgv"
                value={bankCardPayload.cgv}
                onInput={validatePassword}
                className={"w-full"}
                icon={false}
              />
              <input
                className="w-full border border-seconGray rounded-lg px-5 py-2"
                type="date"
                name="expirationDate"
                value={bankCardPayload.expirationDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                variant="secondary"
                className={"float-right w-[147px] text-xs h-12"}
              >
                Lưu chi tiết
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Other Payment */}
      <div
        className={`bg-white p-5 rounded-xl flex flex-col gap-4 transition-all duration-500 ease-in-out ${
          toggleOther ? " h-[250px] lg:h-[188px]" : "h-[60px]"
        } overflow-hidden`}
      >
        <a
          className=" w-full cursor-pointer flex items-center relative gap-2"
          onClick={() => {
            setToggleOther((prev) => !prev);
            settoggleVisa(false);
          }}
        >
          <PaymentcardIcon size="20" />
          <p className="text-base text-gray-800 active:opacity-70 transition-opacity duration-150">
            Phương thức ví điện tử
          </p>
          <div className="absolute right-0">
            {toggleOther ? (
              <ArrowUpIcon size="20" />
            ) : (
              <ArrDownIcon size="20" />
            )}
          </div>
        </a>
        {toggleOther && (
          <form action="#" className="flex flex-col gap-4">
            <div className="flex gap-4 flex-col lg:flex-row">
              <select
                name=""
                id=""
                className=" w-full lg:w-[512px] bg-white border border-seconGray rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary"
              >
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
              <Input
                icon={false}
                className={"w-full lg:w-[512px]"}
                placeholder="Enter ID"
              />
            </div>
            <div>
              <Button
                variant="secondary"
                className={"float-right w-[147px] text-xs h-12"}
              >
                Lưu chi tiết
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Payment;
