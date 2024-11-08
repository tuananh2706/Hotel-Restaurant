import LocationIcon from "../../../assets/icons/locationIcon";
import Input from "../../../component/inputSearch";
import Button from "../../../component/myButton";
import Title from "../../../component/text/titleCategory";

function SavedAddress() {
  return (
    <div className="grid gap-8 p-2 lg:p-0">
      <Title className={"text-[28px] font-medium"}>Thay đổi địa chỉ</Title>
      <form action="#" className="w-full bg-white p-5 rounded-xl grid gap-4">
        <h5 className="text-base font-medium text-gray-900 flex gap-2">
          <LocationIcon size="20" /> Địa chỉ chính
        </h5>
        <div className="flex gap-4">
          <select className="px-4 py-3 w-full rounded-lg outline-none border border-seconGray">
            <option>1</option>
            <option>1</option>
            <option>1</option>
            <option>1</option>
          </select>
          <Input icon={false} className={"w-full"} placeholder="Đường" />
        </div>
        <textarea
          name=""
          id=""
          rows={6}
          className="p-5 border border-seconGray outline-none rounded-lg text-sm"
          placeholder="Nhập địa chỉ chi tiết"
        />
        <div className="flex justify-end">
          <Button variant="secondary" className={"text-xs w-[147px] h-12"}>
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SavedAddress;
