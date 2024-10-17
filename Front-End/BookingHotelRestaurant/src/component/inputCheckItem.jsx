function InputCheckItem({content, ...rest }) {
  return (
    <label className="relative flex items-center cursor-pointer w-40 h-auto ">
      <input
        type="radio"
        {...rest}
        className="peer appearance-none absolute inset-0 h-full w-full z-10 cursor-pointer"
      />
      {/* peer là kích hoạt khi ấn vào phần tử này sẽ ảnh hưởng tới phần tử peer khác trong tailwind css */}
      <span className="px-4 py-2 border rounded-md border-slate-300 text-gray-700 peer-focus:outline-none
       peer-checked:border-green-600 peer-checked:outline-green-600 peer-checked:text-green-600
       peer-checked:font-medium
       transition-colors duration-200 ">
        {content}
      </span>
    </label>
  );
}

export default InputCheckItem;
