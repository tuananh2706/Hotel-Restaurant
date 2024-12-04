import Text from "../text/text";

function ServiceItem({ obj }) {
  const { img, name, description, price } = obj;

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
        <Text className={"text-xl text-primary font-normal"}>{name}</Text>
        <Text className={"text-sm text-secondary overflow-hidden text-ellipsis whitespace-nowrap"}>{description}</Text>
        <Text className={"text-sm text-secondary"}>{`${price ? `+${price}VND` : "Miễn phí"}`}</Text>
      </div>
    </div>
  );
}

export default ServiceItem;
