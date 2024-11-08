import { motion } from "framer-motion";
import Title from "../../component/text/titleCategory";
import CardHotel from "../../component/cards/cardHotel";

function ListingCard({ datas, seeAll = false, className }) {
  const { title, data } = datas;

  return (
    <div className={`w-full flex flex-col gap-7 lg-mt-0 relative ${className}`}>
      <Title className="text-[40px] mb-3 lg:mb-0">{title}</Title>
      {seeAll && (
        <a
          className="text-textGray text-base font-medium underline underline-offset-2 cursor-pointer
           hover:text-secondary hover:-translate-y-1 transition-all duration-200 absolute right-0 top-16 lg:top-8"
        >
          Xem tất cả
        </a>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }} // Bắt đầu với opacity là 0 và di chuyển ra ngoài
            whileInView={{ opacity: 1, x: 0 }} // Khi vào viewport, opacity trở lại 1
            transition={{ duration: 1 }} // Thêm độ trễ nhỏ cho mỗi thẻ card
          >
            <CardHotel obj={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ListingCard;
