import React from 'react';
import {useState, useRef} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import avataricon from '../avataricon.jpg';

import { useNavigate } from 'react-router-dom';

import AuthenticationService from '../Services/AuthenticationService';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const LoginComponent = () => {

	  let navigate = useNavigate();

	  const form = useRef();
	  const checkBtn = useRef();
	
	  const [username, setUsername] = useState("");
	  const [password, setPassword] = useState("");
	  const [loading, setLoading] = useState(false);
	  const [message, setMessage] = useState("");

	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
	};

	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};
	
	const handleLogin = (e) => {
		e.preventDefault();
		setMessage("");
		setLoading(true);
				
		form.current.validateAll();

		if (checkBtn.current.context._errors.length === 0) {
				AuthenticationService.login(username, password).then(
			() => {
			navigate("/");  
			window.location.reload(); 
			},
			(error) => {
			const resMessage =
				(error.response &&
				error.response.data &&
				error.response.data.message) ||
				error.message ||
				error.toString();

			setLoading(false);
			setMessage(resMessage);
        }
		);
		} else {
			setLoading(false);
		}
	};
	
	 return (
      <div>
        <div className="col-12 offset-0">
            <div className="col-xs-10 offset-xs-1  col-sm-10 offset-sm-1  col-md-6 offset-md-3  col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="boxcardLoginRegister">

              <img src={avataricon} alt="profile-img" className="profile-img-card" />

              <Form  onSubmit={handleLogin} ref={form} >
                <div className="form-group-sm">
                  <label htmlFor="username">Username</label>
                  <Input type="text" className="form-control"  name="username" value={username} onChange={onChangeUsername} validations={[required]} />
                </div>

                <div className="form-group-sm">
                  <label htmlFor="password">Password</label>
                  <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]} />
                </div>

                <div className="form-group-sm">
                <br/>
                  <button className="btn btn-submit btn-block" disabled={loading} >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span> <i className="fas fa-sign-in-alt"></i> Login</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group-sm">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
                
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>

            </div>
          </div>
        </div>
      </div>
    );

};

export default LoginComponent;








