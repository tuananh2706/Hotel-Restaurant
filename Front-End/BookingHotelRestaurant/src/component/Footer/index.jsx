import FbIcon from "../../assets/icons/social/fbIcons";
import ZaloIcon from "../../assets/icons/social/zaloIcon";
import InstaIcon from "../../assets/icons/social/instaIcon";
import TelegramIcon from "../../assets/icons/social/telegramIcon";
import UnderText from "../text/underText";

function Footer() {
  const size = "50";
  const socialNetwork = [
    {
      id: 1,
      title: "Facebook",
      element: <FbIcon size={size} />,
      link: "https://www.facebook.com/pinnguyen0582",
    },
    {
      id: 2,
      title: "Zalo",
      element: <ZaloIcon size={size} />,
      link: "https://zalo.me/0349199319",
    },
    {
      id: 3,
      title: "Instagram",
      element: <InstaIcon size={size} />,
      link: "https://www.instagram.com/pin_991016/",
    },
    {
      id: 4,
      title: "Telegram",
      element: <TelegramIcon size={size} />,
      link: "https://t.me/Tuananh227706",
    },
  ];
  return (
    <footer className="w-[100%] h-[320px] bg-[#004225] flex flex-col items-center justify-center text-white gap-8">
      <h6 className="text-5xl font-architectsDaughter">My Logo</h6>
      <p className="text-4xl font-architectsDaughter">
        Connect with Us and Explore
      </p>
      <div className="flex gap-8">
        {socialNetwork.map((item) => {
          return (
            <a href={item.link} target="_blank" key={item.id} className={`relative group`}>
              {item.element}
              <UnderText text={item.title} />
            </a>
          );
        })}
      </div>
      <p className="border-b-2 pb-2 border-gray-600 text-gray-200 text-sm italic tracking-wider">Hoặc liên hệ với sdt: 098.xxx.xxx | email: trung.nguyen99319@gmail.com </p>
    </footer>
  );
}

export default Footer;
