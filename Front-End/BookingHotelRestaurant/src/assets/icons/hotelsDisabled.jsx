function HotelsDisabled({ color = "#030104", size = "24" }) {
  return (
    <svg
      height={`${size}px`}
      width={`${size}px`}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink" // Đã sửa thành `xmlnsXlink`
      viewBox="0 0 17.837 17.837"
      xmlSpace="preserve" // Đã sửa thành `xmlSpace`
    >
      <g>
        <g>
          <path
            style={{ fill: color }} // Sử dụng đối tượng style trong React
            d="M10.82,9.144c0.502-0.502,0.502-1.314,0-1.817l-0.114-0.113c-0.455-0.457-1.17-0.496-1.673-0.121
                 L6.751,4.81c0.104-0.352,0.016-0.747-0.262-1.024c-0.403-0.404-1.059-0.404-1.462,0L3.721,5.091c-0.404,0.404-0.405,1.059,0,1.463
                 c0.276,0.278,0.673,0.364,1.024,0.261l2.282,2.282C6.652,9.6,6.693,10.314,7.149,10.77l0.114,0.114
                 c0.501,0.502,1.315,0.502,1.816,0l0.408-0.409l4.3,3.574l0.197-0.198L10.41,9.553L10.82,9.144z"
          />
          <path
            style={{ fill: color }} // Sử dụng đối tượng style trong React
            d="M8.918,0C4,0,0,4,0,8.918s4,8.919,8.918,8.919s8.919-4.001,8.919-8.919S13.836,0,8.918,0z
                  M8.918,16.793c-2,0-3.823-0.756-5.213-1.988l3.362-3.362c-0.037-0.03-0.077-0.055-0.111-0.089l-0.113-0.112
                 c-0.285-0.285-0.452-0.648-0.504-1.027l-3.587,3.588c-1.068-1.345-1.709-3.04-1.709-4.885c0-4.343,3.532-7.875,7.875-7.875
                 c1.845,0,3.54,0.642,4.884,1.708L10.11,6.443c0.381,0.054,0.749,0.222,1.027,0.502l0.113,0.111
                 c0.034,0.035,0.06,0.074,0.092,0.111l3.463-3.463c1.232,1.391,1.988,3.214,1.988,5.214C16.793,13.261,13.261,16.793,8.918,16.793z"
          />
        </g>
      </g>
    </svg>
  );
}

export default HotelsDisabled;
