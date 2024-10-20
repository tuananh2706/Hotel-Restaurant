function TextHiglight({ children, className, ...rest }) {
  return (
    <span className={`text-danger ${className}`} {...rest}>
      {children}
    </span>
  );
}

export default TextHiglight;
