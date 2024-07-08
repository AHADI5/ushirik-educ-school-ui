import ProfileDropdown from "../../other/user_role"
import { useNavigate } from "react-router-dom"
import logo from "../../../../../assets/img/ushirik-logo.svg"
import Button from '@mui/material/Button';

export default function AuthHeader(showLoginButton) {
    const navigate = useNavigate();
    function redirectToLogin() {
        navigate("/")
    }
    function redirectToCreateAccount() {
        navigate("/signup")
    }
    return (
        <>
            <div className="header-container flex justify-around gap-56">
                <div className="header flex justify-center gap-2">
                    <div className="logo flex"> <img src={logo} alt="Ushirik-educ" /></div>
                    <div className="componey-name flex justify-center"> <h3>Ushirik </h3> </div>

                </div>
                {showLoginButton.shown === 0 &&
                    <div ><Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1976d2', // Customize the background color
                            color: '#ffffff', // Customize the text color
                            textTransform: 'none', // Remove uppercase transformation
                            fontSize: '13px', // Customize the font size
                            padding: '5px 10px', // Customize the padding
                            '&:hover': {
                                backgroundColor: '#115293', // Customize the hover color
                            },
                        }}
                        onClick={redirectToLogin}
                    >
                        Login
                    </Button></div>
                }
                {showLoginButton.shown === 1 &&
                    <div>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2', // Customize the background color
                                color: '#ffffff', // Customize the text color
                                textTransform: 'none', // Remove uppercase transformation
                                fontSize: '13px', // Customize the font size
                                padding: '5px 10px', // Customize the padding
                                '&:hover': {
                                    backgroundColor: '#115293', // Customize the hover color
                                },
                            }}
                            onClick={redirectToCreateAccount}
                        >
                            Créer un compte
                        </Button>
                    </div>
                }
                {showLoginButton.shown === 2 && <ProfileDropdown />}

            </div>

        </>


    )

}