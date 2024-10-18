import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Yêu thích', content: 'Content for Item One' },
    { label: 'Booking', content: 'Content for Item Two' },
    { label: 'Thanh toán', content: 'Content for Item Three' },
    { label: 'Cài đặt', content: 'Content for Item Four' },
    { label: 'Đánh giá', content: 'Content for Item Five' },
    { label: 'Địa chỉ đã lưu', content: 'Content for Item Six' },
  ];

  return (
    <div className="flex gap-[30px] mt-4">
      {/* Tabs Sidebar */}
      <div className="w-[250px] px-[23px] flex flex-col items-center py-9 bg-white p-4 rounded-2xl">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full h-[63px] flex items-center justify-center text-gray-900 p-2 ${
              activeTab === index ? 'bg-secondary bg-opacity-20 rounded-xl' : 'bg-white'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-grow p-4">
        <h2 className="text-xl font-bold mb-2">{tabs[activeTab].label}</h2>
        <p>{tabs[activeTab].content}</p>
      </div>
    </div>
  );
};

export default Tabs;
