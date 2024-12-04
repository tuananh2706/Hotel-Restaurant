import { createContext, useEffect, useState } from "react";
import { getHotels, getHotelsById } from "../service/hotelsService";
import { useGlobalContext } from ".";

export const HotelsContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hotelDetail, setHotelDetail] = useState({});
  const { setNotification, setLoading } = useGlobalContext();
  const [queryParam, setQueryParam] = useState({
    hotelName: null,
    categoryId: null,
    locationId: null,
    sortByCategory: null,
    sortByPrice: null,
    page: 1,
    pageSize: 5,
  });

  const buildQueryString = (query) => {
    const queryParams = Object.entries(query)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
    return queryParams.join("&");
  };

  useEffect(() => {
    const queryString = buildQueryString(queryParam);
    fetchHotels(queryString);
  }, [queryParam]);

  //   useEffect(() => {
  //     const queryParams = [];
  //     if (query.hotelName)
  //       queryParams.push(`hotelName=${encodeURIComponent(query.hotelName)}`);
  //     if (query.categoryId)
  //       queryParams.push(`categoryId=${encodeURIComponent(query.categoryId)}`);
  //     if (query.locationId)
  //       queryParams.push(`locationId=${encodeURIComponent(query.locationId)}`);
  //     if (query.sortByCategory)
  //       queryParams.push(
  //         `sortByCategory=${encodeURIComponent(query.sortByCategory)}`
  //       );
  //     if (query.sortByPrice)
  //       queryParams.push(`sortByPrice=${encodeURIComponent(query.sortByPrice)}`);
  //     if (query.page) queryParams.push(`page=${encodeURIComponent(query.page)}`);
  //     if (query.pageSize)
  //       queryParams.push(`pageSize=${encodeURIComponent(query.pageSize)}`);

  //     const queryString = queryParams.join("&");

  //     fetchHotels(queryString);
  //   }, [query]);

  const fetchHotels = async (query) => {
    try {
      setLoading(true);
      const response = await getHotels(query);
      console.log("response", response);

      setHotels(response.data);
      setTotalHotels(response.totalCount);
      setTotalPages(Math.ceil(response.totalCount / queryParam.pageSize));
    } catch (error) {
      console.error("Đã có lỗi xảy ra: ", error.message);
      setNotification(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelById = async (id) => {
    try {
      setLoading(true);
      const response = await getHotelsById(id);
      setHotelDetail(response.data);
      setNotification(response.message);
    } catch (error) {
      console.error("Đã có lỗi xảy ra ở fetch by id: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        totalHotels,
        hotelDetail,
        fetchHotelById,
        setQueryParam,
        totalPages,
        queryParam,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};
