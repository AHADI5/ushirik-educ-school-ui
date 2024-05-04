import ProfileDropdown from "../../other/user_role"
import { useNavigate } from "react-router-dom"
import logo from "../../../../../assets/img/ushirik-logo.svg"
export default function AuthHeader(showLoginButton) {
  const navigate = useNavigate();  
  function redirectToLogin() {
        navigate("/login")
    }
    return (
        <>
          <div className="header-container flex justify-around gap-56">
              <div className="header flex justify-center gap-2">
                  <div className="logo flex"> <img src={logo} alt="Ushirik-educ" /></div>
                  <div className="componey-name flex justify-center"> <h3>Ushirik </h3> </div>
                 
              </div>
              {showLoginButton.shown === 0 && <div ><button onClick={redirectToLogin}>Login</button></div>}
              {showLoginButton.shown === 1 && <div> <a href="">back to home page</a> </div>}
              {showLoginButton.shown === 2 && <ProfileDropdown/>}

          </div>
         
        </>
    )

}