import Title from "../../component/text/titleCategory";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


function Disscount({ datas }) {
  const { title, imgUrl } = datas;
  return (
    <div className="relative">
      <Title className={"mb-7"}>{title}</Title>
      <a
        className="text-textGray text-base font-medium underline
         underline-offset-2 cursor-pointer hover:text-secondary
         hover:-translate-y-1 transition-all duration-200 absolute right-0 top-12"
      >
        Xem tất cả
        <KeyboardDoubleArrowRightIcon />
      </a>
      <div className="grid grid-cols-4 grid-flow-col gap-5">
        {imgUrl &&
          imgUrl.map((item, index) => {
            return (
              <a key={index} className="h-[300px]">
                <img
                  src={item}
                  className="h-full object-cover rounded-[20px]"
                />
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default Disscount;
