import Hotel1Star from "../../assets/icons/hotel/hotel1Star";
import Hotel2Star from "../../assets/icons/hotel/hotel2Star";
import Hotel4Star from "../../assets/icons/hotel/hotel4Star";
import Hotel5Star from "../../assets/icons/hotel/hotel5Star";
import Hotel3Star from "../../assets/icons/hotel/hotel3Star";
import Banner from "./banner";
import ListingCard from "./listingCard";
import Category from "./category";
import Disscount from "./disscount";
import Demo1 from "../../assets/img/disscount/demo1.jpg";
import Demo2 from "../../assets/img/disscount/demo2.jpg";
import Demo3 from "../../assets/img/disscount/demo3.jpg";
import Demo4 from "../../assets/img/disscount/demo4.jpg";
import { motion } from "framer-motion";
import useDelayedRender from "../../hook/useDelayedRender";
function HomePage() {
  const delayRender = useDelayedRender();

  const datas = {
    title: "Khách sạn nổi bật",
    data: [
      {
        title: "Victory Mường thanh ",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
        raiting: "4.0",
      },
      {
        title: "Hotel Name",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
        raiting: "4.0",
      },
      {
        title: "Hotel Name",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/597477830.jpg?k=377b5060bd6f72917ac92db6d45ea10de18054d31a59fc621b1874d4fdb0ce96&o=&hp=1",
        raiting: "4.0",
      },
      {
        title: "Hotel Name",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
        raiting: "4.0",
      },
    ],
  };

  const category = {
    title: "Danh mục",
    data: [
      {
        icon: Hotel1Star,
        title: "Khách sạn 1 sao",
        amount: "789",
      },
      {
        icon: Hotel2Star,
        title: "Khách sạn 2 sao",
        amount: "789",
      },
      {
        icon: Hotel3Star,
        title: "Khách sạn 3 sao",
        amount: "789",
      },
      {
        icon: Hotel4Star,
        title: "Khách sạn 4 sao",
        amount: "789",
      },
      {
        icon: Hotel5Star,
        title: "Khách sạn 5 sao",
        amount: "789",
      },
    ],
  };

  const datasNear = {
    title: "Khách sạn gần bạn",
    data: [
      {
        title: "Victory Mường thanh ",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
        raiting: "4.0",
      },
      {
        title: "Hotel Name",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
        raiting: "4.0",
      },
      {
        title: "Hotel Name",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cf.bstatic.com/xdata/images/hotel/max1280x900/597477830.jpg?k=377b5060bd6f72917ac92db6d45ea10de18054d31a59fc621b1874d4fdb0ce96&o=&hp=1",
        raiting: "4.0",
      },
      {
        title: "Hotel Name",
        address: "Quận Tân Phú",
        price: "999",
        category: "2 sao",
        thumbnailUrl:
          "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
        raiting: "4.0",
      },
    ],
  };

  const disscount = {
    title: "Phòng rẻ giá hời",
    imgUrl: [Demo1, Demo2, Demo3, Demo4],
  };
  if (!delayRender)
    return (
      <div className="w-full h-screen lg:w-[1440px] px-4 sm:px-10 mt-5 flex items-center flex-col"></div>
    );

  return (
    <div className="w-full lg:w-[1440px] px-4 sm:px-10 mt-5 flex items-center flex-col">
      <motion.div
        className="fade-in-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Banner />
      </motion.div>

      <div className="w-full lg:w-[1300px] flex flex-col mt-52 md:mt-0 gap-10 mb-16">
        <ListingCard datas={datas} className={"mt-4 lg:mt-0"} />
        <Category datas={category} />
        <ListingCard datas={datasNear} seeAll />
        <Disscount datas={disscount} />
      </div>
    </div>
  );
}

export default HomePage;
