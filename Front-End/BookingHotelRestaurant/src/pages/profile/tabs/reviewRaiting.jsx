import RaitingProfile from "../../../component/cards/cardRaitingInProfile";
import Title from "../../../component/text/titleCategory";
import { useAuth } from "../../../context/authContext";

function ReviewRaiting() {
  const { reviewsUser } = useAuth();
  return (
    <div className="flex flex-col gap-5 p-2 lg:p-0">
      <Title className={"text-[28px] font-medium text-center lg:text-left"}>
        Review và Đánh giá
      </Title>
      <div className="grid grid-flow-row grid-cols-1 place-items-center lg:grid-cols-2 gap-4">
        {reviewsUser &&
          reviewsUser.map((item) => (
            <RaitingProfile key={item.hotelReviewId} obj={item} />
          ))}
      </div>
    </div>
  );
}

export default ReviewRaiting;
