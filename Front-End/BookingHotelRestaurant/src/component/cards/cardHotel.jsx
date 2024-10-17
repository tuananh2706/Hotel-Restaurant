import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function CardHotel({ obj }) {
  return (
    // Sử dụng group ở phần tử lớn nhất để làm hiệu ứng hover
    <div className="bg-white rounded-lg p-3 pb-5 flex flex-col gap-3 group cursor-pointer hover:shadow-md transition-shadow ">
      <div className="w-full h-[220px] overflow-hidden relative">
        {/* Sử dụng relative ở div chứa ảnh để định vị ảnh không bị vỡ layout. sau đó ta có thể tùy ý thay đổi kích thước ảnh. */}
        <img
          src={obj.thumbnailUrl}
          alt="khách sạn"
          className="object-cover w-full h-full rounded-md transform transition-transform duration-300 group-hover:scale-110"
          // dùng group hover để tạo hiệu ứng. nghĩa là chỉ cần hover vào div tổng thì ảnh sẽ bị ảnh hưởng.
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          {/* Sử dụng kĩ thuật ngăn việc xuống hàng, khi chữ quá 70% width thì sẽ chuyển thành "..." */}
          <p className="text-primary font-medium text-xl overflow-hidden whitespace-nowrap text-ellipsis max-w-[70%] relative group">
            {obj.title}
          </p>
          <span className="px-2 py-1 text-white font-medium text-xs bg-secondary rounded-md flex items-center">
            {obj.raiting}
          </span>
        </div>
        <p className="text-textGray font-normal">{obj.address}</p>
      </div>
      <p className="text-textGray text-sm">
        <AttachMoneyIcon fontSize="small" />
        {`${obj.price} cho 2 người | ${obj.category}`}
      </p>
    </div>
  );
}

export default CardHotel;
