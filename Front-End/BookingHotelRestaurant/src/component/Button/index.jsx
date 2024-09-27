function Button({ children, variant = "default", ...rest }) {
  let realClass;
  switch (variant) {
    case "default":
      realClass = "";
  }

  return (
    <button
      {...rest}
      className={`p-3 border rounded-xl text-white text-center text-xs bg-[#004225] hover:bg-opacity-90 transition-all hover:-translate-y-1 ${realClass}`}
    >
      {children}
    </button>
  );
}

export default Button;
