import Hotel1Star from "../../assets/icons/hotel/hotel1Star";
import Hotel2Star from "../../assets/icons/hotel/hotel2Star";
import Hotel4Star from "../../assets/icons/hotel/hotel4Star";
import Hotel5Star from "../../assets/icons/hotel/hotel5Star";
import Hotel3Star from "../../assets/icons/hotel/hotel3Star";
import Banner from "./banner";
import ListingCard from "./listingCard";
import Category from "./category";
import Disscount from "./disscount";

function HomePage() {
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
    imgUrl: [
      "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
      "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
      "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
      "https://cdn1.ivivu.com/images/2023/06/02/18/S(2)2631___tpz29i____horizontal-800x450.webp?o=png",
    ],
  };
  return (
    <div className="w-[1440px] px-10 mt-5 flex items-center flex-col">
      <Banner />
      <div className="w-[1300px] flex flex-col gap-10 mb-16">
        <ListingCard datas={datas} />
        <Category datas={category} />
        <ListingCard datas={datasNear} seeAll />
        <Disscount datas={disscount} />
      </div>
    </div>
  );
}

export default HomePage;
