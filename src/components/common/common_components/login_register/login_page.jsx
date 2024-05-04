import ContactFooter from "../../../utilities/footer";
import AuthHeader from "../lay_outs/authentification_process/auth_header";
import LoginProcess from "./login_process";

export default function LoginForm() {
  return (
    <div className="form-section">
      <div className="header-content">
        <AuthHeader shown={1} />
        <div className="form flex flex-col  justify-center items-center">
            <LoginProcess/>
        </div>
      </div>

      {/* <div className="footer flex flex-col justify-center items-center">

          <ContactFooter/>

      </div> */}

    </div>
  );
}
