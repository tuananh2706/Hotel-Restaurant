function Button({ children, variant = "default", className, ...rest }) {
  let realClass="";

  return (
    <button
      {...rest}
      className={`p-3 border rounded-xl text-white text-center text-xs bg-[#004225] hover:bg-opacity-90 transition-all ${realClass} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
