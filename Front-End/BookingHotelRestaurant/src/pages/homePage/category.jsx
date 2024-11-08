import CardTypeHotel from "../../component/cards/cardTypeHotel";
import Title from "../../component/text/titleCategory";

function Category({ datas }) {
  const { title, data } = datas;
  return (
    <div>
      <Title className="mb-7 text-[40px]">{title}</Title>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((item, index) => (
          <CardTypeHotel
            key={index}
            icon={item.icon}
            title={item.title}
            subTitle={item.amount}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
