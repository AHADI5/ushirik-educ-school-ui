import AuthHeader from "../lay_outs/authentification_process/auth_header";
import SignUpForm from "./register_form";

export default function SignUpPage() {
  return (
    <div className="form-section">
      <div className="header-content">
            <AuthHeader shown={0} />
        <div className="form flex flex-col  justify-center items-center">
            <SignUpForm/>
        </div>
      </div>

      {/* <div className="footer flex flex-col justify-center items-center">

          <ContactFooter/>

      </div> */}

    </div>
  );
}
