import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from '../../../../../assets/img/ushirik-logo.svg'
export default function AppMenu({menus}) {
    return (
        <div id="application-sidebar" className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-55 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 "> 
        <div className="">
            <div className="logo-name flex flex-col justify-center items-center">
                <div className="logo-nav h-8 w-8">
                    <img src={logo} alt="logo" />
                </div>
                <div className="app-name">
                    <span>Ushirik</span>
                </div>
            </div>
        </div>
            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                
            <div className="navigations space-y-1.5">
                    {menus.map((item, index) => (
                        <Link key={index} to={item.link} className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100">
                            <FontAwesomeIcon icon={item.icon} />
                            {item.menu}
                        </Link>
                    ))}
                </div>
            </nav>     
        </div>
    )

}
