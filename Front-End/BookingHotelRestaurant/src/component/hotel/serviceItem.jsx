import Text from "../text/text";
import demo from "../../assets/img/banner.png";
import { useGlobalContext } from "../../context";

function ServiceItem({ obj }) {
  const { formatCurrency } = useGlobalContext();
  const { imageUrls, serviceName, servicePrice, description } = obj;
  const img = imageUrls[0] ? imageUrls[0] : demo;

  return (
    <div className="flex gap-5 ">
      {/* img */}
      <div className="w-[100px] h-[100px]">
        <img
          src={img}
          alt="service"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      {/* infor */}
      <div className="flex flex-col justify-between max-w-[280px] py-1">
        <Text className={"text-xl text-primary font-normal"}>
          {serviceName}
        </Text>
        <Text
          className={
            "text-sm text-secondary overflow-hidden text-ellipsis whitespace-nowrap"
          }
        >
          {description}
        </Text>
        <Text className={"text-sm text-secondary"}>{`${
          servicePrice ? `+ ${formatCurrency(+servicePrice)}` : "Miễn phí"
        }`}</Text>
      </div>
    </div>
  );
}

export default ServiceItem;
