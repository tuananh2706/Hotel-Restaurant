import Button from "../myButton";

function DisscountItem({ obj }) {
  const { icon, label, amount, status } = obj;
  return (
    <div className="w-full bg-secondary bg-opacity-10 rounded-lg p-4 flex justify-between items-center border-[1px] border-primary">
      <div className="flex gap-2 text-primary font-medium">
        {icon}
        <p>{label}</p>
      </div>
      <p>
        Offer availed <span className="text-primary font-bold">{amount}</span>{" "}
        times
      </p>
      <Button className={"min-w-[100px]"} variant={`${status ? "secondary" : "danger"}`}>
        {status ? "Avail Ofter" : "Remove"}
      </Button>
    </div>
  );
}

export default DisscountItem;
