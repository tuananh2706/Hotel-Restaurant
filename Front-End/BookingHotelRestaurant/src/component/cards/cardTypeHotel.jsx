function CardTypeHotel({ icon:Icon, title, subTitle, className }) {
  return (
    <div
      className={` flex flex-col items-center justify-center bg-white px-3 py-8 gap-4 rounded-lg
    shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group ${className}`}
    >
      <Icon />
      <div className="flex flex-col items-center  text-primary group-hover:text-secondary">
        <h6 className="text-xl font-medium ">{title}</h6>
        <p className="text-base font-normal">Có khoảng {subTitle} khách sạn</p>
      </div>
    </div>
  );
}

export default CardTypeHotel;
