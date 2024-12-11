import { useEffect, useState } from "react";
import Title from "../../../../component/text/titleCategory";
import { useHotels } from "../../../../context";

function PendingHotels() {
  const { handleFetchAll } = useHotels();
  const [flag, setFlag] = useState(false);
  const [hotelsList, setHotelsList] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      const res = await handleFetchAll();
      setHotelsList(res);
    };
    fetchAll();
  }, [flag]);
  return (
    <div>
      {/* title */}
      <div className="max-w-[250px] border-b border-b-seconGray pb-3">
        <Title className={"text-2xl"}>Khách sạn chờ duyệt</Title>
      </div>
      {/* Dữ liệu */}
      <table>
        <thead>
          <tr>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
            <th>f</th>
          </tr>
        </thead>
        <tbody>
          {hotelsList &&
            hotelsList.map((item) => (
              <tr key={item.hotelId}>
                <td>{item.hotelName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingHotels;
