function Button({ children, variant = "default", className, ...rest }) {
  let realClass = "";
  switch (variant) {
    case "default":
      realClass =
        "text-white border border-primary bg-primary hover:bg-opacity-90";
      break;
    case "secondary":
      realClass =
        "text-white border border-secondary bg-secondary hover:bg-opacity-90";
      break;
    case "outline":
      realClass =
        "text-primary border border-primary hover:bg-secondary hover:text-white ";
      break;
  }

  return (
    <button
      {...rest}
      className={`p-3 flex items-center justify-center border rounded-xl text-center transition-all ${realClass} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
