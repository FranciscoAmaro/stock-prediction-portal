import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const {setIsLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/token/",
        userData
      );
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error", err.response.data);
      setErrors("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-4">
              Loggin to our Portal
            </h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Set password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors && (
                <div className="text-danger text-center mb-3">{errors}</div>
              )}

              {loading ? (
                <button
                  type="submit"
                  className="btn btn-info w-100 mb-3"
                  disabled
                >
                  <FontAwesomeIcon icon={faSpinner} spin />
                  Logging in...
                </button>
              ) : (
                <button type="submit" className="btn btn-info w-100 mb-3">
                  Login
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
