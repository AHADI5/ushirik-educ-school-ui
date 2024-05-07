import { TailSpin } from 'react-loader-spinner';
import { formatDate } from '../../common/utilities/dates-management';
export default function Table({ isLoading, users }) {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" class="px-6 py-3">Nom</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Created at</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? <TailSpin
                visible={true}
                height="30"
                width="30"
                color="rgb(255,255 ,255)"
                ariaLabel="tail-spin-loading"
                radius="0.5"
                wrapperStyle={{}}
                wrapperClass=""
              />
            : users.length === 0
                ? <tr>
                    <td colSpan="4" className="text-center py-4">
                      No user yet
                    </td>
                  </tr>
                : users.map(user => (
                    <tr key={user.userID} className="bg-white border-b ">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap ">
                        {user.firstName + ' ' + user.lastName}
                      </th>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role }</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full ${user.enabled ? 'bg-green-200 text-white' : 'bg-red-500 text-white'}`}>
                          {user.enabled ? 'ACTIVE' : 'DISABLE'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{formatDate(user.createdAt)}</td> {/* Add this line */}
                    </tr>
                  ))
                  
                  
          }
        </tbody>
      </table>
    </div>
  );
}
