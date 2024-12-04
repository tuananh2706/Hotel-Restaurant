import styles from "./Products.module.css";
import Title from "../../component/text/titleCategory";
import React, { useEffect, useState } from "react";
import HotelItem from "../../component/hotel/hotelItem";
import { useHotels } from "../../context";

const localtions = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
  { id: 6, label: "6" },
  { id: 7, label: "7" },
  { id: 8, label: "8" },
  { id: 9, label: "9" },
  { id: 10, label: "10" },
  { id: 11, label: "11" },
  { id: 12, label: "12" },
  { id: 13, label: "Gò Vấp" },
  { id: 14, label: "Bình Thạnh" },
  { id: 15, label: "Tân Phú" },
  { id: 16, label: "Tân Bình" },
];

const categories = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
];

function Hotels() {
  const { hotels, totalHotels, totalPages, queryParam, setQueryParam } =
    useHotels();

  const [categoryQuery, setCategoryQuery] = useState(null);
  const [localtionQuery, setLocationQuery] = useState(null);

  useEffect(() => {
    setQueryParam((prev) => ({
      ...prev,
      categoryId: categoryQuery,
      locationId: localtionQuery,
    }));
  }, [categoryQuery, localtionQuery]);

  const handleScrollOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setQueryParam((prev) => ({
      ...prev,
      page: newPage,
    }));
    handleScrollOnTop();
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 font-medium transition-all duration-300 ease-in-out ${
            queryParam.page === i
              ? "border-b border-b-secondary text-secondary"
              : "hover:text-secondary hover:border-b hover:border-b-secondary"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={`${styles["products"]} gap-7 max-w-[1400px]`}>
      <div className={styles["products__filters"]}>
        <div
          className={`${styles["products__filter-group"]} ${styles["products__filter-group--first"]}`}
        >
          <p className="text-lg font-medium text-primary">Danh mục</p>
          <div className="pl-2 flex flex-col mt-3 gap-3 text-seconGray">
            <a
              onClick={() => {
                setCategoryQuery(null);
                handleScrollOnTop();
              }}
              className={`flex justify-between cursor-pointer hover:text-secondary
                hover:font-medium transition-all duration-300 ease-in-out ${
                  !categoryQuery && "text-secondary font-medium"
                }`}
            >
              Tất cả
            </a>
            {categories.map((category) => (
              <a
                onClick={() => {
                  setCategoryQuery(category.id);
                  handleScrollOnTop();
                }}
                className={` cursor-pointer hover:text-secondary
                  hover:font-medium transition-all duration-300 ease-in-out ${
                    categoryQuery === category.id &&
                    "text-secondary font-medium"
                  }`}
                key={category.id}
              >
                {`Khách sạn ${category.label} sao`}
              </a>
            ))}
          </div>
        </div>

        <div
          className={`${styles["products__filter-group"]} ${styles["products__filter-group--second"]}`}
        >
          <p className="text-lg font-medium text-primary">Vị trí</p>
          <div className="pl-2 flex flex-col mt-3 gap-3 text-seconGray">
            <a
              onClick={() => {
                setLocationQuery(null);
                handleScrollOnTop();
              }}
              className={` cursor-pointer hover:text-secondary
                hover:font-medium transition-all duration-300 ease-in-out ${
                  !localtionQuery && "text-secondary font-medium"
                }`}
            >
              Tất cả
            </a>
            {localtions.map((localtion) => (
              <a
                onClick={() => {
                  setLocationQuery(localtion.id);
                  handleScrollOnTop();
                }}
                className={` cursor-pointer hover:text-secondary
                  hover:font-medium transition-all duration-300 ease-in-out ${
                    localtionQuery === localtion.id &&
                    "text-secondary font-medium"
                  }`}
                key={localtion.id}
              >
                {`Quận ${localtion.label}`}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[80%] flex flex-col gap-5">
        <Title className={"text-2xl md:text-4xl"}>Danh sách khách sạn</Title>
        <p className="text-end text-primary font-medium">
          Kết quả: {totalHotels ? totalHotels : "Không có"} khách sạn{" "}
          {categoryQuery && `${categoryQuery} sao `}
          {localtionQuery &&
            `ở Quận ${
              localtions.find((local) => local.id === localtionQuery).label
            }`}
        </p>
        <div className="flex flex-col gap-4">
          {hotels.map((hotel) => (
            <HotelItem key={hotel.hotelId} obj={hotel} />
          ))}
        </div>

        {/* Phân trang */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
