import { RouterProvider } from "react-router-dom";
import router from "./routingList";

function RoutingPages() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default RoutingPages;
