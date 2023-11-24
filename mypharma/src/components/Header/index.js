import React, { useEffect, useState } from "react";

const Header = () => {
  // Check if the user is logged in based on local storage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if the user is logged in based on your local storage setup
    const data = localStorage.getItem("userData");
    if (data !== null) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(data));
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Handle the logout action
    // Remove user information from local storage or perform any other logout tasks
    const confirm = window.confirm("Are you sure want to LOGOUT ?");
    if (confirm) {
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      setUserData(null);
      alert("Logout Successfully...!");
      window.location.href = '/';
    }
  };

  const handleProfileClick = () => {
    // Open the profile page with user details
    // You can navigate to the profile page using your router
    // For this example, we'll just show an alert with user details
    if (userData) {
      alert(`User Details:\nName: ${userData.name}\nUsername: ${userData.username}\nRole: ${userData.role}`);
    }
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a
          href="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img
            alt="..."
            className="h-10"
            src="https://www.collinsdictionary.com/images/full/capsule_639127393_1000.jpg"
          />
          <span className="ml-3 text-xl">PharmacyManagementApp</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <a href="/about us" className="mr-5 hover:text-gray-900">
            About us
          </a>
          <a href="/doctors" className="mr-5 hover:text-gray-900">
            For Doctors
          </a>
          <a href="/contact" className="mr-5 hover:text-gray-900">
            contact us
          </a>
        </nav>
        <div className="flex items-center">
          {isLoggedIn ? (
            <React.Fragment>
              <button onClick={handleProfileClick} className="mr-5 hover:text-gray-900 cursor-pointer">
                Profile
              </button>
              <button onClick={handleLogout} className="mr-5 hover:text-gray-900 cursor-pointer">
                Logout
              </button>
            </React.Fragment>
          ) : (
            <a href="/login" className="mr-5 hover:text-gray-900">
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
