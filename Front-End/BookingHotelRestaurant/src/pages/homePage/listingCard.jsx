import Title from "../../component/text/titleCategory";
import CardHotel from "../../component/cards/cardHotel";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
function ListingCard({ datas, seeAll = false }) {
  const { title, data } = datas;
  return (
    <div className="w-full flex flex-col gap-7 relative">
      <Title className={"text-[28px]"}>{title}</Title>
      {seeAll && (
        <a
          className="text-textGray text-base font-medium underline
         underline-offset-2 cursor-pointer hover:text-secondary
         hover:-translate-y-1 transition-all duration-200 absolute right-0 top-8"
        >
          Xem tất cả
          <KeyboardDoubleArrowRightIcon />
        </a>
      )}
      <div className="grid grid-cols-4 grid-flow-col gap-5">
        {data &&
          data.map((item, index) => {
            return <CardHotel key={index} obj={item} />;
          })}
      </div>
    </div>
  );
}

export default ListingCard;
