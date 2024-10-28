import { useState } from "react";
import Title from "../../../component/text/titleCategory";
import Input from "../../../component/inputSearch";
import Button from "../../../component/myButton";
import PaymentcardIcon from "../../../assets/icons/paymentcard";
import ArrowUpIcon from "../../../assets/icons/arrowUpIcon";
import ArrDownIcon from "../../../assets/icons/arrowDownIcon";

function Payment() {
  const [toggleVisa, settoggleVisa] = useState(false);
  const [toggleOther, setToggleOther] = useState(false);
  return (
    <div className="h-[610px] flex flex-col gap-8">
      <Title className={"text-[28px] font-medium"}>
        Quản lý phương thức thanh toán
      </Title>
      {/* VisaPayment */}
      <div
        className={` bg-white rounded-xl transition-all duration-500 ease-in-out ${
          toggleVisa ? "h-[316px]" : "h-[60px]"
        } flex flex-col gap-4 p-5 overflow-hidden`}
      >
        <a
          onClick={() => settoggleVisa((prev) => !prev)}
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
            <Input icon={false} placeholder="Nhập tên của bạn" />
            <Input icon={false} placeholder="Nhập số thẻ" />
            <div className="flex w-full gap-4 ">
              <Input type="password" className={"w-full"} icon={false} />
              <Input className={"w-full"} icon={false} />
            </div>
            <div>
              <Button variant="secondary" className={"float-right w-[147px] text-xs h-12"}>
                Lưu chi tiết
              </Button>
            </div>
          </form>
        )}
      </div>
      {/* Other payment */}
      <div
        className={`bg-white p-5 rounded-xl flex flex-col gap-4 transition-all duration-500 ease-in-out ${
          toggleOther ? "h-[188px]" : "h-[60px]"
        } overflow-hidden`}
      >
        <a
          className=" w-full cursor-pointer flex items-center relative gap-2"
          onClick={() => setToggleOther((prev) => !prev)}
        >
          <PaymentcardIcon size="20" />
          <p className="text-base text-gray-800 active:opacity-70 transition-opacity duration-150">
            Phương thức ví điện tử
          </p>
          <div className="absolute right-0">
            {toggleOther ? <ArrowUpIcon size="20" /> : <ArrDownIcon size="20" />}
          </div>
        </a>
        {toggleOther && (
          <form action="#" className="flex flex-col gap-4">
            <div className="flex gap-4">
              <select
                name=""
                id=""
                className="w-[512px] bg-white border border-seconGray rounded-lg px-4 py-3 text-sm outline-none focus:border-secondary"
              >
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
              <Input
                icon={false}
                className={"w-[512px]"}
                placeholder="Enter ID"
              />
            </div>
            <div>
              <Button variant="secondary" className={"float-right w-[147px] text-xs h-12"}>
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
