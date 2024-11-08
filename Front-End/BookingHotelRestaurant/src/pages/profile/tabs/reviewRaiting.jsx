import RaitingProfile from "../../../component/cards/cardRaitingInProfile";
import Title from "../../../component/text/titleCategory";

function ReviewRaiting() {
  return (
    <div className="flex flex-col gap-5 p-2 lg:p-0">
      <Title className={"text-[28px] font-medium text-center lg:text-left"}>
        Review và Đánh giá
      </Title>
      <div className="grid grid-flow-row grid-cols-1 place-items-center lg:grid-cols-2 gap-4">
        <RaitingProfile />
        <RaitingProfile />
        <RaitingProfile />
        <RaitingProfile />
      </div>
    </div>
  );
}

export default ReviewRaiting;
