import Schools from './school_list';
import AuthHeader from '../../common/common_components/lay_outs/authentification_process/auth_header';
import RegisterSchoolForm from './school_multisteps_form';

export default function MultiStepsFromRegistration () {
  return (
    <div className="form-section">
      <div className="header-content pt-3">
        <AuthHeader shown={2} />
        <div className="form flex flex-col  justify-center items-center">
          <RegisterSchoolForm/>
        </div>
      </div>
    </div>
  );
}
