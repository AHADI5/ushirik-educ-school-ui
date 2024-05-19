import React from 'react';
import FullFeaturedCrudGrid from '../../common/utilities/Full_Crud_Table';
import { useParams } from 'react-router-dom';



const columns = [
  { field: 'name', headerName: 'Name', width: 120, editable: true },
  { field: 'lastName', headerName: 'Last Name', width: 120, editable: true },
  { field: 'firstName', headerName: 'First Name', width: 120, editable: true },
  { field: 'gender', headerName: 'Gender', width: 50, editable: true },
//   { field: 'classID', headerName: 'Class ID', type: 'number', width: 100, editable: true },
//   {
//     field: 'parent',
//     headerName: 'Parent Details',
//     width: 300,
//     editable: false,
//     valueGetter: (params) => {
//       const { firstName, lastName, email, phone } = params.row.parent || {};
//       return `Name: ${firstName} ${lastName}, Email: ${email}, Phone: ${phone}`;
//     },
//   },
];

const initialRows = [
  // Define initial rows or fetch from server
];



function ClassroomStudentList() {
    const params = useParams() ;
    return  (
        <>
            <div className="student-list flex">
                <div className="students">
                    <p>Students</p>
                </div>
                <Outlet/>
            </div>
        </>
    )
    /**
     * 
     * TRYING WITHOUT TABLE 
     */
//   return (
//     <FullFeaturedCrudGrid
//       columns={columns}
//       initialRows={initialRows}
//       fetchUrl={``}
//       editUrl="http://your-api.com/edit"
//       deleteUrl="http://your-api.com/delete"
//     />
//   );
}

export default ClassroomStudentList;
