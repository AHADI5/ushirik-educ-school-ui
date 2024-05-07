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
            <button
              type="button"
              class="relative inline-flex justify-center items-center h-[2.375rem] w-[2.375rem] text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white "
            >
              <svg
                class="flex-shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span class="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500 text-white">
                99+
              </span>
            </button>
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
