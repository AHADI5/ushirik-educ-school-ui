import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ProfileDropdown from '../other/user_role';
import { faBell } from '@fortawesome/free-solid-svg-icons'; 
export default function AppHeader () {
  return (
    <div className="nav-menu sticky top-0 inset-x-0 flex  mt-0 pt-0 sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py- sm:py-4 lg:ps-64 ">
      <div
        className="flex basis-full justify-between w-full mx-auto px-4 sm:px-6 md:px-8"
        aria-label="Global"
      >
        <div class="sm:hidden">
          <button
            type="button"
            class="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700"
          >
            <svg
              class="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>

        <div class="hidden sm:block">
          <label for="icon" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
              <svg
                class="flex-shrink-0 size-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              id="icon"
              name="icon"
              class="py-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder="Search"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <div  class="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ">
            <FontAwesomeIcon icon={faBell}/>
          </div>
          <ProfileDropdown/>
        </div>
      </div>
    </div>
  );
}
