import imgBanner from "../../assets/img/banner.png";
import Input from "../../component/inputSearch";
import Button from "../../component/myButton";
import { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Calendar from "../../assets/icons/time";
import UserIcon from "../../assets/icons/userIcon";
import DropDown from "../../component/cards/dropdown";
import ArrDownIcon from "../../assets/icons/arrowDownIcon";

function Banner() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [openCheckOutCalendar, setOpenCheckOutCalendar] = useState(false);
  const [openCheckInCalendar, setOpenCheckInCalendar] = useState(false);
  const [selected, setSelected] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(false);

  const selectedPeople = [
    {
      title: "1 người",
      numPeople: 1,
    },
    {
      title: "2 người",
      numPeople: 2,
    },
    {
      title: "3 người",
      numPeople: 3,
    },
    {
      title: "4 người",
      numPeople: 4,
    },
  ];

  const today = dayjs();

  const handleCheckInChange = (newDate) => {
    setCheckInDate(newDate);
    setCheckOutDate(null);
    setOpenCheckInCalendar((pre) => !pre);
    setOpenCheckOutCalendar((pre) => !pre);
  };

  const handleCheckOutChange = (newDate) => {
    setCheckOutDate(newDate);
    setOpenCheckOutCalendar((pre) => !pre);
  };

  return (
    <section className="flex flex-col items-center relative mb-24">
      <img
        src={imgBanner}
        className="w-full h-[288px] lg:h-[550px] bg-cover shadow-sm rounded-sm"
        alt="banner"
      />
      <form
        className="flex flex-col lg:flex-row items-center p-10 gap-3 lg:gap-0 justify-evenly w-[95.59%]
       h-[370px] md:h-[180px] lg:h-[140px] bg-primary absolute top-48 lg:top-[470px] rounded-[20px] shadow shadow-primary"
      >
        <div
          className="w-full lg:w-[617px] h-full lg:h-[60px] bg-white rounded-lg border border-seconGray 
        flex flex-col md:flex-row items-center lg:justify-between mb-4 md:mb-0"
        >
          <div
            className="w-full h-full flex items-center justify-center text-center text-primary border-b
             lg:border-r lg:border-b-0 border-seconGray relative cursor-pointer hover:opacity-80"
            onClick={() => {
              setOpenCheckInCalendar((pre) => !pre);
              if (openCheckOutCalendar) {
                setOpenCheckOutCalendar(false);
              }
            }}
          >
            {checkInDate ? (
              <span>{checkInDate.format("DD/MM/YYYY")}</span>
            ) : (
              "Checkin"
            )}
            <span className="absolute right-5">
              <Calendar size="18" />
            </span>
          </div>
          <div
            className={`w-full h-full flex items-center justify-center text-center border-b text-primary ${
              checkInDate ? "cursor-pointer" : "cursor-not-allowed"
            } lg:border-r lg:border-b-0 border-seconGray relative`}
            onClick={() => {
              if (checkInDate) {
                setOpenCheckOutCalendar(true);
              } else {
                alert("Vui lòng chọn ngày checkin trước!!!");
              }
            }}
          >
            {checkOutDate ? (
              <span>{checkOutDate.format("DD/MM/YYYY")}</span>
            ) : (
              "Checkout"
            )}
            <span className="absolute right-5">
              <Calendar size="18" />
            </span>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* BoxCheckIn */}
            {openCheckInCalendar && (
              <Box
                bgcolor={"white"}
                padding={2}
                borderRadius={4}
                height={360}
                position={"absolute"}
                zIndex={999}
                top={{ xs: 80, sm: 90, md: 105 }}
              >
                <Typography variant="h6">Chọn ngày check-in</Typography>
                <DateCalendar
                  value={checkInDate}
                  onChange={handleCheckInChange}
                  shouldDisableDate={(date) => date.isBefore(today, "day")}
                  sx={{
                    width: "100%", // Đảm bảo DateCalendar chiếm hết chiều rộng trong box
                    maxWidth: "300px", // Giới hạn chiều rộng tối đa
                    fontSize: { xs: "0.75rem", md: "1rem" }, // Điều chỉnh kích thước chữ
                  }}
                />
              </Box>
            )}
            {/* Box checkout */}
            {openCheckOutCalendar && (
              <Box
                bgcolor={"white"}
                padding={2}
                borderRadius={4}
                height={360}
                position={"absolute"}
                zIndex={999}
                top={{ xs: 125, sm: 90, md: 105 }}
                left={{ xs: 25, sm: 200, md: 265 }}
              >
                <Typography variant="h6">Chọn ngày check-out</Typography>
                <DateCalendar
                  value={checkOutDate}
                  onChange={handleCheckOutChange}
                  shouldDisableDate={(date) =>
                    date.isBefore(checkInDate, "day")
                  }
                  sx={{
                    width: "100%", // Đảm bảo DateCalendar chiếm hết chiều rộng trong box
                    maxWidth: "300px", // Giới hạn chiều rộng tối đa
                    fontSize: { xs: "0.75rem", md: "1rem" }, // Điều chỉnh kích thước chữ
                  }}
                />
              </Box>
            )}
          </LocalizationProvider>
          {/* Slected peoples */}
          <div className="w-full relative h-full flex items-center justify-center">
            <div
              className="w-full flex items-center justify-center text-primary cursor-pointer relative"
              onClick={() => {
                setOpenDropdown((pre) => !pre);
              }}
            >
              <span className="absolute left-10">
                <UserIcon size="18" />
              </span>
              <p>{selected} người</p>
              <span className="absolute right-5">
                <ArrDownIcon size="18" />
              </span>
            </div>
            <DropDown
              className={"top-10 w-full"}
              appear="top"
              isOpen={openDropdown}
              onClose={() => {
                setOpenDropdown((pre) => !pre);
              }}
            >
              <div className="p-3 flex flex-col gap-2">
                {selectedPeople &&
                  selectedPeople.map((person) => (
                    <p
                      key={person.numPeople}
                      className="cursor-pointer  text-center text-primary p-1 rounded
                      hover:bg-opacity-80 hover:bg-seconGray "
                      onClick={() => {
                        setSelected(person.numPeople);
                        setOpenDropdown(false);
                      }}
                    >
                      {person.title}
                    </p>
                  ))}
              </div>
            </DropDown>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full lg:w-[546px] md:h-[45px] lg:h-[60px] md:flex-row">
          <Input
            className="h-full w-full lg:w-[430px] mb-4 md:mb-0"
            placeholder="Tìm kiếm khách sạn ..."
            iconBefore
          />
          <Button
            variant="secondary"
            className="text-[14px] md:text-[12px] lg:text-[14px] w-full md:w-[104px] h-full rounded-lg"
          >
            Tìm phòng
          </Button>
        </div>
      </form>
    </section>
  );
}

export default Banner;
