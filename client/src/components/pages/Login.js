import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { loginUser, loadUser } from "../../actions/user";
import { setLoading } from "../../actions/menu";
import UserForm from "../layouts/UserForm";

const Login = props => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setLoading());
      props.history.push("/dashboard");
    }
    //eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  const { getFieldDecorator, getFieldsError } = props.form;

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const login = e => {
    e.preventDefault();

    props.form.validateFields(async (err, values) => {
      let action;
      if (!err) {
        const data = {
          username: values.username,
          password: values.password
        };
        action = await loginUser(data);
        dispatch(action);
        await loadUser(dispatch);
      }
    });
  };

  return (
    <UserForm
      body={
        <div>
          <h1 className="lg-heading">Login</h1>
          <Form layout="horizontal" onSubmit={login} className="user-form">
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

const LoginForm = Form.create({ name: "loginform" })(Login);

export default LoginForm;
