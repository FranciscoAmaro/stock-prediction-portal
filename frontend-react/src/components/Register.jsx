import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = {
      username,
      email,
      password,
    };
    try {
      setSuccess(false);
      const response = await axios.post(
        "http://localhost:8000/api/v1/register/",
        userData
      );

      if (response.status === 201) {
        setErrors({});
        setSuccess(true);
      }
    } catch (err) {
      setErrors(err.response.data);
      console.error("Registration error", err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-4">Create an Account</h3>
            <form onSubmit={handleRegistration}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <small>
                  {errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </small>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small>
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </small>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Set password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <small>
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </small>
              </div>
              {success && (
                <div className="alert alert-success">
                  Registration Succesful
                </div>
              )}
              {loading ? (
                <button type="submit" className="btn btn-info w-100 mb-3" disabled>
                 <FontAwesomeIcon icon={faSpinner} spin />
                  Please wait...
                </button>
              ) : (
                <button type="submit" className="btn btn-info w-100 mb-3">
                  Register
                </button>
              )}
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
