import Schools from './school_list';
import AuthHeader from '../../common/common_components/lay_outs/authentification_process/auth_header';

export default function MultiSchools () {
  return (
    <div className="form-section">
      <div className="header-content pt-3">
        <AuthHeader shown={2} />
        <div className="form flex flex-col  justify-center items-center">
          <Schools />
        </div>
      </div>

      {/* <div className="footer flex flex-col justify-center items-center">
  
            <ContactFooter/>
  
        </div> */}

    </div>
  );
}
