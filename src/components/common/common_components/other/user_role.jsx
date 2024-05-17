import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/auth';

function ProfileDropdown() {
    const [isShown, setIsShown] = useState(false);
    const dropdownRef = useRef(null);
    const { logout} = useAuth();

    // Decoding the token 
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsShown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    function toggleInformation() {
        setIsShown(prevState => !prevState);
    }

    const token = sessionStorage.getItem("token");
    var decodedToken = "" 

    if (token) {
        decodedToken = jwtDecode(token);
        console.log(decodedToken);
        // Use the decoded token here
    } else {
        // Handle case when token is not present in localStorage
        console.error("Token is missing in localStorage");
    }

    const navigate = useNavigate();

    const handleLogout = () => {   
        logout()      
        navigate("/");
    };

    return (
        <div className="z-50 relative inline-block text-left" ref={dropdownRef}>
            {/* Profile picture */}
            <div
                className="mr-2 w-9 h-9 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white cursor-pointer"
                onClick={toggleInformation}
                style={{ zIndex: 50 }} // Set z-index to ensure the dropdown appears on top
            >
                <Avatar name={decodedToken["sub"]} round={true} size='30'/>
                {/* Green status indicator */}
                <div className="absolute right-0 bottom-0 w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            {/* Dropdown menu */}
            {isShown && (
                <div className="informations absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg" style={{ zIndex: 50 }}>
                    <div className="py-3 px-5">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-800">{decodedToken["sub"]}</p>
                    </div>
                    <div className="text-xs text-gray-500 px-5 py-2 border-t border-gray-200">
                        {decodedToken["authorities"]}
                    </div>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
