import { Outlet } from "react-router-dom";
import Responsive from "./left_carroussel";
import Carousel from "react-multi-carousel";

export default function LoginRegisterLayout() {
  return (
    <>
      {/* Login header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {/* Outlet */}
        <div className="lg:col-span-2">
          <Outlet />
        </div>

        {/* Carroussel */}
        <div className="bg-gray-200">
          {/* <Carousel  
              responsive={Responsive}
              swipeable={false}
              draggable={false}
              showDots={true}
              autoPlay={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              centerMode={true}
             
          
          >
          <div className="w-full"><img src="https://picsum.photos/id/1/200/300" alt="" /></div>
          <div><img src="https://picsum.photos/id/1/200/300" alt="" /></div>
          <div><img src="https://picsum.photos/id/1/400/500" alt="" /></div>
          <div><img src="https://picsum.photos/id/1/200/300" alt="" /></div>
          <div><img src="https://picsum.photos/id/1/200/300" alt="" /></div>
          <div><img src="https://picsum.photos/id/1/200/300" alt="" /></div>
        </Carousel> */}
        </div>
      </div>
      {/* Step process content */}
    </>
  );
}
