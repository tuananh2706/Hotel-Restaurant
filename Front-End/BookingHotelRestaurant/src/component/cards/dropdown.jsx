function DropDown({
  width,
  height,
  children,
  isOpen,
  onClose,
  className,
  appear = "top right",
}) {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 opacity-10 z-10 transition-opacity duration-200 ease-in-out`}
          onClick={onClose}
        ></div>
      )}
      <div
        style={{
          height: `${height}px`,
          width: `${width}px`,
          transformOrigin: `${appear}`,
        }}
        className={`absolute bg-white shadow-sm border-seconGray border z-10 rounded-xl ${className} 
        transition-all duration-200 ease-in-out transform ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }
        `}
      >
        {children}
      </div>
    </>
  );
}

export default DropDown;
