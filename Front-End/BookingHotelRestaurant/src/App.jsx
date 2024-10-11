import "./App.css";
import Button from "./component/Button";
import InputSearch from "./component/InputSearch";

function App() {
  return (
    <div className="mx-2 my-7 d-flex gap-4">
      <Button>DashBorrd</Button>
      <InputSearch
        className="w-[430px] h-12"
        placeholder="Tìm kiếm khách sạn ..."
        iconBefore={false}
      />
    </div>
  );
}

export default App;
