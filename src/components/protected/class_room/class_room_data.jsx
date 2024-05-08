import ClassroomTable from "./class_room_table";

export default function ClassRooms () {
    const [isLoading, setIsLoading] = useState(true);
    const [classrooms, setClassrooms] = useState([]);
    
    useEffect(() => {
      // Fetch classrooms data here
      // After data is fetched, set isLoading to false
      setIsLoading(false);
    }, []);
    
    return (
      <div>
        {isLoading ? 'Loading...' : <ClassroomTable classrooms={classrooms} />}
      </div>
    );
    
}