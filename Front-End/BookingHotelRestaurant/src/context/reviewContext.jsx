import { createContext, useContext } from "react";
import {
  createReview,
  deleteReview,
  editReview,
} from "../service/reviewService";
import { useHotels } from ".";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { fetchHotelById } = useHotels();
  const addNewReview = async (payload, id) => {
    try {
      await createReview(payload);
      await fetchHotelById(id);
      return true;
    } catch (error) {
      console.error("Đã có lỗi xảy ra ở addNewReview", error.message);
    }
  };

  const editReviewed = async (payload, id) => {
    try {
      await editReview(payload, id);
      return true;
    } catch (error) {
      console.error("Đã có lỗi xảy ra ở editReviewed", error.message);
    }
  };

  const deleteReviewed = async (id) => {
    try {
      const response = await deleteReview(id);
      return response;
    } catch (error) {
      console.error("Đã có lỗi xảy ra ở editReviewed", error.message);
    }
  };
  return (
    <ReviewContext.Provider
      value={{ deleteReviewed, editReviewed, addNewReview }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => useContext(ReviewContext);
