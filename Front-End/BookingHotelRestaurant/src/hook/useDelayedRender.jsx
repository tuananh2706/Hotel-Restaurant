import { useEffect, useState } from "react";

function useDelayedRender(delay = 300) {
  const [isRendered, setIsRendered] = useState(() => {
    // Kiểm tra sessionStorage, nếu có `hasRendered` là true, không cần delay
    // Sẽ lấy trạng thái rendered ra từ session nếu nó bằng true. (sessionStorage là chỉ lưu trữ trong phiên làm việc, lưu trữ cục bộ trong tab, )
    return sessionStorage.getItem("hasRendered") === "true";
  });

  useEffect(() => {
    // Chỉ chạy delay trong lần đầu tiên render trong phiên làm việc
    if (!isRendered) {
      const timer = setTimeout(() => {
        // Dùng requestAnimationFrame để đảm bảo trải nghiệm mượt mà
        requestAnimationFrame(() => {
          setIsRendered(true);
          sessionStorage.setItem("hasRendered", "true"); // Đánh dấu đã render trong session
        });
      }, delay);

      return () => clearTimeout(timer); // Xóa timer nếu component unmount
    }
  }, [delay, isRendered]);

  return isRendered;
}

export default useDelayedRender;

// // Cách hoạt động của hook custom này là: khi component được mount thì sẽ bị delay 1 khoảng thời gian, hook sẽ kiểm tra xem trong
// // session storage có key nào là hasRendered hay không ? nếu nó thì nó sẽ không delay nữa, còn nếu trả false thì nó sẽ hoạt động hàm
// // trong useEfect.

// Cách hoạt động của hook: Lần đầu tiên render Hook sẽ sử dụng setTimeout và requestAnimationFrame để delay và thực hiện hiệu ứng
//một cách mượt mà. Sau khi hoàn thành, nó lưu vào sessionStorage rằng component đã render.

//Các lần render tiếp theo trong cùng phiên: Hook sẽ ngay lập tức trả true mà không cần chờ delay,
//cho phép hiển thị component mà không cần delay thêm.

//requestAnimationFrame là một API của JavaScript cung cấp cách hiệu quả và mượt mà để thực hiện các thao tác
//animation hoặc các thay đổi trên giao diện web. Khi bạn sử dụng requestAnimationFrame, trình duyệt sẽ đảm bảo
// rằng những thay đổi trên giao diện được thực thi đúng thời điểm, ngay trước khi khung hình tiếp theo được vẽ ra,
// giúp hoạt động của animation mượt mà hơn và tránh giật lag.
