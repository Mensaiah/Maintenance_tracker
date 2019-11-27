import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Form } from "antd";
import UserForm from "../layouts/UserForm";
import { signUp, setError, loadUser } from "../../actions/user";

const Register = props => {
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }
    //eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  const { getFieldDecorator, getFieldsError } = props.form;
  const dispatch = useDispatch();
  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleRegister = e => {
    e.preventDefault();

    props.form.validateFields(async (err, values) => {
      let action;
      if (!err) {
        if (values.password !== values.confirmPassword) {
          dispatch(setError("Passwords do not match"));
        } else {
          const data = {
            name: values.fullname,
            username: values.username,
            password: values.password,
            adminStatus: values.isAdmin
          };
          action = await signUp(data);
          dispatch(action);
          action = await loadUser();
          dispatch(action);
        }
      }
    });
  };

  return (
    <UserForm
      body={
        <div>
          <h1 className="lg-heading">Register</h1>
          <Form layout="horizontal" onSubmit={handleRegister}>
            <Form.Item>
              {getFieldDecorator("fullname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Full Name"
                  }
                ]
              })(
                <Input
                  placeholder="Full Name"
                  label="Full Name"
                  name="fullName"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Username"
                  }
                ]
              })(
                <Input
                  placeholder="Username"
                  label="Username"
                  name="username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("isAdmin")(<input type="checkbox" />)}
              <span className="sm-text">
                {" "}
                I am an Admin (Click this if you are the facility admin)
              </span>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Password"
                  }
                ]
              })(
                <Input
                  type="password"
                  placeholder="Password"
                  label="Password"
                  name="password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("confirmPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please Comfirm your Password"
                  }
                ]
              })(
                <Input
                  type="password"
                  placeholder=" Comfirm Password"
                  label=" Comfirm Password"
                  name="comfirm-password"
                />
              )}
            </Form.Item>
            <Button
              htmlType="submit"
              id="submit"
              className="btn btn-sec"
              disabled={hasErrors(getFieldsError())}
              block
            >
              Submit
            </Button>
          </Form>
        </div>
      }
    />
  );
};
const RegisterForm = Form.create({ name: "registerform" })(Register);

export default RegisterForm;
