import React, { useContext,useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { Route, withRouter } from "react-router-dom";
import { useForm } from "../../utils.js/hooks";
import { AuthContext } from "../../context/auth";
function Login({ history }) {
    const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy,{data:{login}}) {
        // console.log(userData)
context.login(login);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });
  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
          type="text"
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          error={errors.password ? true : false}
          onChange={onChange}
          value={values.password}
          type="password"
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
const LOGIN_USER = gql`
  mutation login($username:String!, $password:String!) {
    login(username:$username, password:$password) {
      username
      token
    }
  }
`;
export default withRouter(Login);
