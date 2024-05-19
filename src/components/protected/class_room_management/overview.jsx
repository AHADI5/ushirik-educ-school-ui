import AttendanceBarChart from "../charts/student_attendance";
import StudentGenderChart from "../charts/students_gender";
import { useParams } from "react-router-dom";

export default function Overview() {
  const params = useParams();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-gray-100 p-2 rounded-lg shadow h-48 overflow-auto">
          {/* <h2 className="text-xl font-semibold mb-4">Class Info</h2> */}
          <p>Classe</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg shadow h-48 overflow-auto">
            <p>Genres</p>
          {/* <h2 className="text-xl font-semibold mb-4">Student Gender Distribution</h2> */}
          <StudentGenderChart />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gray-100 p-2 rounded-lg shadow h-48 overflow-auto">
          <p>Présences</p>
          {/* <h2 className="text-xl font-semibold mb-4">Attendance Bar Chart</h2> */}
          <AttendanceBarChart />
        </div>
        <div className="bg-gray-100 p-2 rounded-lg shadow h-48 overflow-auto">
          {/* <h2 className="text-xl font-semibold mb-4">Additional Information</h2> */}
          <p>Absents aujourd'hui</p>
        </div>
      </div>
    </>
  );
}
