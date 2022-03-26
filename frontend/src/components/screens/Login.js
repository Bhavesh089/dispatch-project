import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "antd";
import { LoginOutlined, GoogleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { message } from "antd";

//send user function
import { loginUser } from "../../functions/auth";

const Login = ({ history, location }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();

  const { user } = useSelector((state) => ({ ...state }));

  //success mes
  const success = (msg) => {
    message.success({
      content: msg,
      className: "custom-class",
      style: {
        marginTop: "11vh",
      },
    });
  };

  const errorMessage = (msg) => {
    message.error({
      content: msg,
      className: "custom-class",
      style: {
        marginTop: "11vh",
      },
    });
  };

  //if user then redirect to homepage
  //   useEffect(() => {
  //     let intended = history.location.state;
  //     if (intended) {
  //       return;
  //     } else {
  //       if (user && user.token) history.push("/");
  //     }
  //   }, [user, history]);

  //handle user data  //sign with email password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username, password, "i got the username and password");
      setLoading(true);
      //sign with email password
      //sending token to create user function
      loginUser(username, password)
        .then((res) => {
          console.log(res, "login response--->");
          success("successfully logged in");
          //dispatch data
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              userId: res.data.data.userId,
              username: res.data.data.username,
              token: res.data.data.token,
              refreshToken: res.data.data.refreshToken,
            },
          });
          return history.push("/listing");

          //   roleBaseRedirect(res);
        })
        .catch((error) => {
          console.log(error, "this is the erorr");
          console.log(error.response.data.msg, "this is the erorr");
          errorMessage(error.response.data.msg);
          setLoading(false);
        });
    } catch (error) {
      console.log(error, "this is the erorr");
      setLoading(false);
    }
  };

  //if
  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  //google

  //Register Form
  const loginForm = () => (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        layout={"vertical"}
        onSubmitCapture={handleSubmit}
      >
        <Form.Item
          label="username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            className="success-focus"
          />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Button
          onClick={handleSubmit}
          type="primary"
          shape="round"
          block
          className="mb-3"
          size="large"
          icon={<LoginOutlined />}
          disabled={!username || password.length < 3}
          ghost
        >
          Login
        </Button>
      </Form>
    </>
  );

  return (
    <>
      <div className="top-box row"></div>
      <div className="container p-5">
        <div className="row">
          <div className="Register md-col-6 offset-md-3">
            <h4>LOGIN</h4>
            <small className="Register">Welcome back!!</small>
            {loginForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
