import Demo from "../../assets/img/banner.png";
import Text from "../../component/text/text";
import Email from "../../assets/icons/email";
import LocationIcon from "../../assets/icons/locationIcon";
import Call from "../../assets/icons/call";
import Calendar from "../../assets/icons/time";
import KeyIcon from "../../assets/icons/key";
import EditIcon from "../../assets/icons/edit";
import Birthday from "../../assets/icons/birthday";
import QuocTich from "../../assets/icons/quocTich";

function Information() {
  const information = [
    {
      content: "16/10/1999",
      icon: <Birthday />,
      subContent: "Việt Nam",
      subIcon: <QuocTich />,
    },
    {
      content: "trungnguyen@gmail.com",
      icon: <Email />,
      subContent: "Quận Tân Bình",
      subIcon: <LocationIcon />,
    },
    {
      content: "089.610.1610",
      icon: <Call />,
      subContent: "Bạn đã đặt 5 khách sạn",
      subIcon: <Calendar />,
    },
  ];

  return (
    <div className=" bg-white h-60 rounded-2xl w-full flex justify-center items-center">
      <div className="w-[1280px] h-40 flex gap-12">
        <img src={Demo} className="w-40 h-40 object-cover rounded-xl" />
        <div className="flex flex-col gap-8">
          <h6 className="font-medium text-black text-[32px]">
            Nguyễn Trí Trung
          </h6>
          <div className="flex gap-[120px]">
            {information &&
              information.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col gap-7">
                    <div className="flex gap-3">
                      {item.icon}
                      <Text size={"md"} className={"font-normal"}>
                        {item.content}
                      </Text>
                    </div>
                    <div className="flex gap-3">
                      {item.subIcon}
                      <Text size={"md"} className={"font-normal"}>
                        {item.subContent}
                      </Text>
                    </div>
                  </div>
                );
              })}

            <div className="flex flex-col gap-7">
              <a
                className="flex gap-2 text-secondary cursor-pointer group
                 transition-all duration-150 active:-translate-y-[-2px] active:opacity-50"
              >
                <EditIcon />
                <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform  group-hover:translate-x-2">
                  Thay đổi thông tin
                </p>
              </a>
              <a
                className="flex gap-2 text-secondary cursor-pointer group
                 transition-all duration-150 active:-translate-y-[-2px] active:opacity-50"
              >
                <KeyIcon />
                <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform  group-hover:translate-x-2">
                  Thay đổi mật khẩu
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
