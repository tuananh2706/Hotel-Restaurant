import Title from "../../component/text/titleCategory";

function Disscount({ datas }) {
  const { title, imgUrl } = datas;
  return (
    <div className="relative">
      <Title className="text-[40px] mb-10 lgmb-7">{title}</Title>
      <a
        className="text-textGray text-base font-medium underline underline-offset-2 cursor-pointer hover:text-secondary hover:-translate-y-1
       transition-all duration-200 absolute right-0 top-14 lg:top-8"
      >
        Xem tất cả
      </a>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {imgUrl.map((item, index) => (
          <a
            key={index}
            className="h-[300px] cursor-pointer overflow-hidden relative group"
          >
            <img
              src={item}
              className="h-full w-full object-cover rounded-[20px] group-hover:scale-105 group-hover:shadow-lg transition-all duration-200"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Disscount;
