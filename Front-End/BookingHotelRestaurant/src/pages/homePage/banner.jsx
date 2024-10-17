import imgBanner from "../../assets/img/banner.png";
import Input from "../../component/InputSearch";
import Button from "../../component/myButton";

function Banner() {
  return (
    <section className="flex justify-center flex-col items-center relative mb-24">
      <img
        src={imgBanner}
        className="max-w-[1440px] w-full h-[550px] bg-cover shadow-sm rounded-sm"
      />
      <div className="flex items-center p-[40px] justify-evenly w-[1300px] h-[140px] bg-primary absolute bottom-[-70px] rounded-[20px] shadow shadow-primary">
        <div className="w-[617px] h-[60px] bg-white rounded-lg borer border-seconGray flex items-center justify-between">
          <input
            type="date"
            name="checkInDate"
            className=" w-full h-full rounded-s-lg border-r border-seconGray"
          />
          <input
            type="date"
            name="checkOutDate"
            className="w-full h-full border-r border-seconGray"
          />
          <select name="numOfPeople" className="w-full  h-full rounded-e-lg">
            <option value="2">2 người</option>
            <option value="3">3 người</option>
            <option value="4">4 người</option>
          </select>
        </div>
        <Input
          className={"h-[60px] w-[430px]"}
          placeholder="Tìm kiếm khách sạn ..."
          iconBefore
        />
        <Button
          variant="secondary"
          className={"text-[14px] w-[104px] h-[60px] rounded-lg"}
        >
          Tìm bàn
        </Button>
      </div>
    </section>
  );
}

export default Banner;
