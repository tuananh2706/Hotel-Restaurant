import demo from "../../assets/img/banner.png";

function RoomItem({ obj, onClick }) {
  const { typeName, rooms } = obj;
  const img =
    rooms[0]?.imageUrls[0]?.length > 0 ? rooms[0]?.imageUrls[0] : demo;
  const amount = rooms?.length || 0;
  return (
    <div
      onClick={onClick}
      className="relative w-[132px] h-[142px] rounded-xl group cursor-pointer overflow-hidden"
    >
      <img
        src={img}
        alt="abc"
        className="rounded-xl object-cover w-full h-full group-hover:opacity-80 transition-opacity duration-300"
      />
      <div
        className="absolute bottom-0 lg:bottom-[-30%] lg:group-hover:bottom-0 
          transition-all duration-300 ease-in-out
          w-full h-[30%] flex flex-col items-center justify-center
          bg-black bg-opacity-50 rounded-b-xl text-white"
      >
        <p className="text-sm">{typeName}</p>
        <span className="text-[10px]">({amount})</span>
      </div>
    </div>
  );
}

export default RoomItem;
