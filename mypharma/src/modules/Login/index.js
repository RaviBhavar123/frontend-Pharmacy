import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    username: "", 
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log(formdata);
    try {
      const response = await axios.post("http://localhost:8081/user/authenticate", formdata); // Use axios.post for sending form data
      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        const userdetails = await axios.get(`http://localhost:8081/user/login/${formdata.username}/${formdata.password}`, {
          headers: { // Use "headers" instead of "header"
            Authorization: "Bearer " + response.data,
          },
        });
        if (userdetails.status === 200) {
          localStorage.setItem("userData", JSON.stringify(userdetails.data)); // Use JSON.stringify to store data
          console.log(userdetails.data);
          alert("Hi "+userdetails.data.name+",\nYou Logged in Successfully..!")
          if(userdetails.data.role==='Doctor'){
               navigate("/products")
               window.location.reload();
          }
          else  if(userdetails.data.role==='Admin')
          navigate("/Admindashboard")
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata({ ...formdata, [name]: value });

  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <form onSubmit={handleSubmit}>
          <div className="container flex flex-col items-center justify-center h-screen -mt-10">
            <div className="lg:w-1/3 md:w-1/2 bg-gray-100 shadow-md rounded-lg p-4">
              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
              <div className="relative mb-4">
                <label htmlFor="username" className="leading-7 text-sm text-gray-600">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formdata.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
              >
                Click to login
              </button>
              <p>Forgot Password</p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
