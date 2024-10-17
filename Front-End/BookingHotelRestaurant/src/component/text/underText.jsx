function UnderText({ text }) {
  return (
    <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs mt-1">
      {text}
    </span>
  );
}

export default UnderText;