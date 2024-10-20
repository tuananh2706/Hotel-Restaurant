function Text({ className, size="sm", children, ...rest }) {
  let realSize = "";
    switch(size) {
        case "sm" : realSize = "text-base"; break;
        case "md" : realSize = "text-[22px]"; break;
    }
  return (
    <p className={`text-primary ${className} ${size}`} {...rest}>
      {children}
    </p>
  );
}

export default Text;
