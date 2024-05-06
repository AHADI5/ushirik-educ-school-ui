import React, {useState} from 'react';
import ProfileDropdown from '../../other/user_role';

const TopBar = () => {
  // State for search input value
  const [searchValue, setSearchValue] = useState ('');

  // Handle search input change
  const handleSearchChange = e => {
    setSearchValue (e.target.value);
  };

  return (
    <div className="top-bar fixed top-0 left-0 right-0 bg-white text-grey h-16 flex items-center justify-between px-4 border-b">
      <div className="flex items-center space-x-4">
        {/* Notification icon */}
        <button className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v4m6-4v4"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 21v-7a2 2 0 012-2h2a2 2 0 012 2v7m-6 0a2 2 0 01-2-2v-4H5a2 2 0 01-2-2V9a6 6 0 016-6 6 6 0 016 6v4a2 2 0 01-2 2h-2v4a2 2 0 01-2 2z"
            />
          </svg>
        </button>

        {/* Apps icon */}
        <button className="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      {/* Search bar */}
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search"
        className=" px-3 py-1 rounded focus:outline-none bg-gray-200"
      />

      {/* Avatar icon */}
      <div className="flex items-center space-x-2 justify-center">
        <div className="icons flex justify-between  items-center gap-5">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              height={24}
              width={24}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
          </div>
          <div className="icon">
            <svg focusable="false" viewBox="0 0 24 24" height={24} width={24}>
              <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z" />
              <image
                src="https://ssl.gstatic.com/gb/images/bar/al-icon.png"
                alt=""
                height="24"
                width="24"
              />
            </svg>
          </div>
          <ProfileDropdown />

        </div>
      </div>
    </div>
  );
};

export default TopBar;
