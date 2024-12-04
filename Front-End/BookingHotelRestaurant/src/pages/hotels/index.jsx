import styles from "./Products.module.css";
import Title from "../../component/text/titleCategory";
import React, { useState } from "react";
import HotelItem from "../../component/hotel/hotelItem";
import { useHotels } from "../../context";

function Hotels() {
  const { hotels, totalHotels, totalPages, queryParam, setQueryParam } =
    useHotels();

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
          className={`px-3 py-2 mx-1 text-sm font-medium ${
            queryParam.page === i
              ? "bg-blue-500 text-white rounded-full"
              : "bg-white text-blue-500 hover:bg-blue-100 hover:text-blue-700 rounded-full"
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
          <p className={styles["products__filter-title"]}>Chọn tiêu chí lọc</p>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check1-1" name="check1" />
            <label htmlFor="check1-1">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check4-1" name="check4" />
            <label htmlFor="check4-1">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check7-1" name="check7" />
            <label htmlFor="check7-1">Chọn</label>
          </div>
        </div>

        <div
          className={`${styles["products__filter-group"]} ${styles["products__filter-group--second"]}`}
        >
          <p className={styles["products__filter-title"]}>Chọn tiêu chí lọc</p>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check1-2" name="check1" />
            <label htmlFor="check1-2">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check4-2" name="check4" />
            <label htmlFor="check4-2">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check7-2" name="check7" />
            <label htmlFor="check7-2">Chọn</label>
          </div>
        </div>

        <div
          className={`${styles["products__filter-group"]} ${styles["products__filter-group--third"]}`}
        >
          <p className={styles["products__filter-title"]}>Chọn tiêu chí lọc</p>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check1-3" name="check1" />
            <label htmlFor="check1-3">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check4-3" name="check4" />
            <label htmlFor="check4-3">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check7-3" name="check7" />
            <label htmlFor="check7-3">Chọn</label>
          </div>
        </div>

        <div
          className={`${styles["products__filter-group"]} ${styles["products__filter-group--fourth"]}`}
        >
          <p className={styles["products__filter-title"]}>Chọn tiêu chí lọc</p>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check1-4" name="check1" />
            <label htmlFor="check1-4">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check4-4" name="check4" />
            <label htmlFor="check4-4">Chọn</label>
          </div>
          <div className={styles["products__filter-item"]}>
            <input type="checkbox" id="check7-4" name="check7" />
            <label htmlFor="check7-4">Chọn</label>
          </div>
        </div>
      </div>

      <div className="w-[80%] flex flex-col gap-5">
        <Title className={"text-2xl md:text-4xl"}>Danh sách khách sạn</Title>
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
