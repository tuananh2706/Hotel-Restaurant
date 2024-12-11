import { createContext, useEffect, useState } from "react";
import {
  getAllHotels,
  getHotels,
  getHotelsById,
} from "../service/hotelsService";
import { useGlobalContext } from ".";
import {
  activate,
  getHotelsOwner,
  suspend,
} from "../service/ownerHotelsService";

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

  const { buildQueryString } = useGlobalContext();

  useEffect(() => {
    const queryString = buildQueryString(queryParam);
    fetchHotels(queryString);
  }, [queryParam]);

  const fetchHotels = async (query) => {
    try {
      setLoading(true);
      const response = await getHotels(query);

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
    } catch (error) {
      console.error("Đã có lỗi xảy ra ở fetch by id: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelOwner = async () => {
    try {
      const accountName = localStorage.getItem("accountName");
      const accessToken = localStorage.getItem("AT");
      const response = await getHotelsOwner(accountName, accessToken);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  const suspendHotelOwner = async (hotelId) => {
    try {
      const accountName = localStorage.getItem("accountName");
      const accessToken = localStorage.getItem("AT");
      const response = await suspend(accountName, hotelId, accessToken);
      return response;
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  const activeHotelOwner = async (hotelId) => {
    try {
      const accountName = localStorage.getItem("accountName");
      const accessToken = localStorage.getItem("AT");
      const response = await activate(accountName, hotelId, accessToken);
      return response;
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  const handleFetchAll = async () => {
    try {
      setLoading(true);
      const a = {
        isActive: false,
        page: 1,
        pageSize: 20,
      };
      const query = buildQueryString(a);
      const response = await getAllHotels(query);
      return response.data;
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
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
        fetchHotels,
        fetchHotelOwner,
        activeHotelOwner,
        suspendHotelOwner,
        handleFetchAll,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};
