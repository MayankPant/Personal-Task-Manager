import AccessTokenContext from "../context/AccessTokenContext";
import { Component } from "react";
import axios from "axios";
class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.setState({ accessToken, isAuthenticated: true, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }

  login = async (username, password) => {
    const loginUrl =
      process.env.REACT_APP_AUTH_BASE_ADDRESS.concat("/api/auth/login");
    console.log("Login Url: ", loginUrl);
    console.log("Entered username: ", username);
    console.log("Entered password: ", password);
    const payload = {
      username: username,
      password: password,
    };
    try {
      var response = await axios.post(loginUrl, payload);
      console.log("Returned Response from login: ", response);
      if (response.status === 200) {
        // set the loggedIn state and token described in <App />
        console.log("Recieved JWT Access token: ", response.data.accessToken);
        console.log("Recieved JWT refresh token: ", response.data.refreshToken);

        this.setState({
          accessToken: response.data.accessToken,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
    } catch (error) {
      console.log("Error Occured", error);
      return false;
    }
  };

  logout = async () => {
    this.setState({ accessToken: null, isAuthenticated: false });
  };

  render() {
    const { accessToken, isLoading, isAuthenticated } = this.state;
    const { children } = this.props;
    const { login, logout } = this;

    
    if (isLoading) {
      return <div>Loading....</div>;
    }
    return (
      <AccessTokenContext.Provider
        value={{
          accessToken,
          isAuthenticated,
          login,
          logout,
        }}
      >
        {children}
      </AccessTokenContext.Provider>
    );
  }
}

export default AuthProvider;
