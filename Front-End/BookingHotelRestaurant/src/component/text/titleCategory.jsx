function Title({ children, className, ...rest }) {
  return (
    <h3
      className={` text-[40px] font-semibold bg-gradient-to-r
         from-[#00854A] via-[#02AC62] to-[#0CD27B]
          bg-clip-text text-transparent ${className}`}
      {...rest}
    >
      {children}
    </h3>
  );
}

export default Title;