import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';
import avataricon from '../avataricon.jpg';

import AuthenticationService from '../Services/AuthenticationService';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 5 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 5 and 100 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 100 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthenticationService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };


return (
      <div>
        <div className="col-12 offset-0">
            <div className="col-xs-10 offset-xs-1  col-sm-10 offset-sm-1  col-md-6 offset-md-3  col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="boxcardLoginRegister">

              <img src={avataricon} alt="profile-img" className="profile-img-card" />

          <Form onSubmit={handleRegister} ref={form} >
            {!successful && (
              <div>
                <div className="form-group-sm">
                  <label htmlFor="username">Username</label>
                  <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required, vusername]} />
                </div>

                <div className="form-group-sm">
                  <label htmlFor="password">Password</label>
                  <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required, vpassword]} />
                </div>

                <div className="form-group-sm">
                  <label htmlFor="email">E-mail</label>
                  <Input type="text" className="form-control" name="email" value={email} onChange={onChangeEmail} validations={[required, validEmail]} />
                </div>

                <div className="form-group-sm">
                  <br/>
                  <button className="btn btn-submit btn-block"> <i className="fa fa-edit"></i> Sign Up</button>
                </div>
              </div>
            )}
			<br/>
            {message && (
              <div className="form-group-sm">
                <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert" >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>

          </div>
          </div>
        </div>
        <div className="empty"></div>
      </div>
    );

  };

  export default Register;





