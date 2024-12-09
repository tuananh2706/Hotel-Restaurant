import { Outlet, useNavigate } from "react-router-dom";
import BuildingIcon from "../../../../assets/icons/building";
import Hotel1Star from "../../../../assets/icons/hotel/hotel1Star";
import Hotel2Star from "../../../../assets/icons/hotel/hotel2Star";
import Hotel3Star from "../../../../assets/icons/hotel/hotel3Star";
import Hotel4Star from "../../../../assets/icons/hotel/hotel4Star";
import Hotel5Star from "../../../../assets/icons/hotel/hotel5Star";
import LocationIcon from "../../../../assets/icons/locationIcon";
import HotelManagementItem from "../../../../component/hotel/hotelManagementItem";
import Title from "../../../../component/text/titleCategory";
import { useGlobalContext } from "../../../../context";
import { useEffect, useState } from "react";
import { getAllHotels } from "../../../../service/hotelsService";
import useDebounce from "../../../../hook/useDebounce";
import HotelsManagementDetail from "./hotelsManagementDetail";

const categories = [
  { id: 1, name: "Khách sạn 1 sao", icon: <Hotel1Star size="20" /> },
  { id: 2, name: "Khách sạn 2 sao", icon: <Hotel2Star size="20" /> },
  { id: 3, name: "Khách sạn 3 sao", icon: <Hotel3Star size="20" /> },
  { id: 4, name: "Khách sạn 4 sao", icon: <Hotel4Star size="20" /> },
  { id: 5, name: "Khách sạn 5 sao", icon: <Hotel5Star size="20" /> },
];

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

function HotelsManagement() {
  const { buildQueryString, setLoading } = useGlobalContext();
  const [queryParams, setQueryParams] = useState({
    hotelName: "",
    categoryId: null,
    locationId: null,
    page: 1,
    pageSize: 9,
  });
  const [hotelsList, setHotelsList] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();

  const debounceHotelName = useDebounce(queryParams.hotelName, 500);

  const fetchAllHotels = async (query) => {
    try {
      setLoading(true);
      const response = await getAllHotels(query);
      setHotelsList(response.data);
      setTotalPages(Math.ceil(response.totalCount / queryParams.pageSize));
    } catch (error) {
      console.error("Đã có lỗi xảy ra: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = (id) => {
    navigate(`${id}`);
  };

  useEffect(() => {
    const query = buildQueryString(queryParams);
    fetchAllHotels(query);
  }, [
    debounceHotelName,
    queryParams.categoryId,
    queryParams.locationId,
    queryParams.page,
    queryParams.pageSize,
  ]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 font-medium transition-all duration-300 ease-in-out ${
            queryParams.page === i
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

  const handleScrollOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }));
    handleScrollOnTop();
  };

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[300px]">
        <Title className={"text-3xl"}>Hotels Management</Title>
        <p className=" italic">(Quản lý khách sạn)</p>
      </div>
      <div className="w-full flex mt-[28px] gap-6 ">
        <div className="basis-[25%] flex flex-col gap-5">
          <div className="w-full bg-white rounded px-[30px] py-[32px] shadow">
            <h4 className="text-[22px] text-primary font-medium pb-5 border-b border-b-theirdGray text-center">
              Danh mục khách sạn
            </h4>
            <div className="text-[#5A5A5A] mt-4 flex flex-col gap-4">
              <div className="flex flex-col">
                <div
                  onClick={() =>
                    setQueryParams((prev) => ({
                      ...prev,
                      categoryId: null,
                    }))
                  }
                  className={`flex justify-between cursor-pointer ${
                    !queryParams.categoryId
                      ? "text-primary font-medium hover:text-primary"
                      : ""
                  }
                     hover:text-secondary transition-colors duration-200`}
                >
                  <div className="flex gap-[10px]">
                    <span>
                      <BuildingIcon size="20" />
                    </span>
                    <p>Tất cả khách sạn</p>
                  </div>
                </div>
              </div>
              {categories &&
                categories.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <div
                      onClick={() => {
                        setQueryParams((prev) => ({
                          ...prev,
                          categoryId: +item.id,
                        }));
                      }}
                      className={`flex justify-between cursor-pointer ${
                        queryParams.categoryId === item.id
                          ? "text-primary font-medium hover:text-primary"
                          : ""
                      }
                         hover:text-secondary transition-colors duration-200`}
                    >
                      <div className="flex gap-[10px]">
                        <span>{item.icon}</span>
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-full bg-white p-5 flex gap-3 flex-col shadow rounded text-[#5A5A5A]">
            <h5 className="text-[22px] text-primary font-medium pb-5 border-b border-b-theirdGray text-center">
              Vị trí:{" "}
            </h5>
            <div className="text-[#5A5A5A] mt-4 flex flex-col gap-4">
              <div className="flex flex-col">
                <div
                  className={`flex justify-between  cursor-pointer ${
                    !queryParams.locationId
                      ? "text-primary font-medium hover:text-primary"
                      : "hover:text-secondary"
                  }
                      transition-colors duration-200`}
                  onClick={() =>
                    setQueryParams((prev) => ({
                      ...prev,
                      locationId: null,
                    }))
                  }
                >
                  <div className="flex gap-[10px]">
                    <span>
                      <LocationIcon size="20" />
                    </span>
                    <p>Tất cả</p>
                  </div>
                </div>
              </div>
              {localtions &&
                localtions.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    <div
                      onClick={() =>
                        setQueryParams((prev) => ({
                          ...prev,
                          locationId: item.id,
                        }))
                      }
                      className={`flex justify-between cursor-pointer 
                        ${
                          queryParams.locationId === item.id
                            ? "text-primary font-medium hover:text-primary"
                            : "hover:text-secondary"
                        }
                        transition-colors duration-200`}
                    >
                      <div className="flex gap-[10px]">
                        <span>
                          <LocationIcon size="20" />
                        </span>
                        <p>{`Quận ${item.label}`}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="basis-[75%] flex flex-col">
          <input
            value={queryParams.hotelName}
            placeholder="Tìm kiếm khách sạn"
            onChange={(e) =>
              setQueryParams((prev) => ({
                ...prev,
                hotelName: e.target.value,
                page: 1
              }))
            }
            className={
              "w-[300px] h-[50px] outline-none p-5 border focus:border-primary text-secondary bg-white rounded shadow"
            }
          />
          <div className="my-5">
            <button
              onClick={() => navigate("/management/hotels/create-hotel")}
              className="px-5 py-2 border rounded-lg text-white font-medium transition-all duration-300
            bg-gradient-to-r from-[#00854A] via-[#02AC62] to-[#0CD27B] hover:bg-clip-text hover:text-transparent
             hover:bg-white hover:border-secondary active:scale-95"
            >
              Thêm khách sạn mới
            </button>
          </div>
          <div className="grid grid-cols-3 w-full gap-5">
            {hotelsList &&
              hotelsList.map((hotel) => (
                <HotelManagementItem
                  onClick={() => handleOpenDetail(hotel.hotelId)}
                  key={hotel.hotelId}
                  hotel={hotel}
                />
              ))}
          </div>
          <div className="mt-4 flex mb-5 justify-center items-center space-x-2">
            {renderPageNumbers()}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HotelsManagement;
