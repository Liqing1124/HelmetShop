import React, { useState, useEffect } from 'react';
import './BackToTopButton.css'; // Import CSS

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hàm kiểm tra vị trí cuộn và cập nhật state isVisible
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Hiển thị nút sau khi cuộn 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hàm cuộn lên đầu trang một cách mượt mà
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Tạo hiệu ứng cuộn mượt
    });
  };

  // Sử dụng useEffect để thêm và xóa event listener khi component mount và unmount
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility); // Thêm listener khi mount

    // Cleanup: xóa listener khi component unmount để tránh memory leak
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // Mảng dependency rỗng đảm bảo effect chỉ chạy một lần sau khi mount

  return (
    <div className="back-to-top-container">
      {/* Chỉ render nút khi isVisible là true */}
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top-button"
          aria-label="Quay lại đầu trang" // Hỗ trợ accessibility
          title="Quay lại đầu trang" // Tooltip khi hover
        >
          {/* Thay thế Unicode bằng SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default BackToTopButton; 