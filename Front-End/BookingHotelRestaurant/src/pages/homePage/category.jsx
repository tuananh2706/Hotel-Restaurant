import CardTypeHotel from "../../component/cards/cardTypeHotel";
import Title from "../../component/text/titleCategory";

function Category({datas}) {
    const {title, data} = datas;  
  return (
    <div>
      <Title className={"mb-7 text-[28px]"}>{title}</Title>
      <div className="grid grid-cols-5 grid-flow-row gap-4">
        {data && data.map((item, index) => {
            return <CardTypeHotel key={index} icon={item.icon} title={item.title} subTitle={item.amount} />
        })}
      </div>
    </div>
  );
}

export default Category;
