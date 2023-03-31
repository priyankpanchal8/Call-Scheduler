import axios from "axios";
import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import { completedLogin, loginError, requestLogin } from '../actions/Auth'

// const navigate = useNavigate();

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email: "",
            Password: "",
            LoginMessage: "",
            Redirect: false
        }
    }

    componentDidMount(){
        this.props.setHeaderText("Login");
    }

    onChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(requestLogin());
        axios.post('http://localhost:8000/api/login', { email: this.state.Email, password: this.state.Password }).then(
            resp => {
                this.props.dispatch(completedLogin(resp.data.access_token, resp.data.userID));
                window.location.href = "/";
            },
            err => {
                this.props.dispatch(loginError(err.response.data.error));
                this.setState({
                    LoginMessage: err.response.data.error
                });
            }
        )
    }

    get RenderError() {
        if (this.state.LoginMessage != "") {
            return (
                <div className="LoginError">
                    <Alert className="danger">
                        <h4>Login Error</h4>
                        {this.state.LoginMessage}
                    </Alert>
                </div>);
        }
        else {
            return (
                <div className="LoginError" >
                    <Alert className="info">
                        <h4>Welcome to Scheduler</h4>
                        Please enter your credentials to continue.
                    </Alert>
                </div >);
        }
    }

    render() {

        return (
            <div>
                <div className="LoginBody">
                    <div className="LoginForm">
                        <div className="ErrorArea">
                            {this.RenderError}
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="email" required name="Email" className="form-control" onChange={this.onChange} value={this.state.Email} placeholder="Username" />
                            </div>
                            <div className="form-group" style={{ marginBottom: 5 }}>
                                <input type="password" required name="Password" className="form-control" onChange={this.onChange} value={this.state.Password} placeholder="Password" />
                            </div>
                            <small style={{ display: "block", marginBottom: 10 }}>
                                <a href="#" className="OrangeLink" onClick={this.handleForgot}>Forgot your password?</a><br />
                                <a href="/registration" className="OrangeLink" onClick={this.handleForgot}>Don't have account with us?</a>
                            </small>
                            <Button className="primary" type="submit">Login</Button>
                        </form>
                        {this.state.redirect ? (<redirect push to="/registration" />) : null}
                    </div>
                </div>
            </div>
        )
    }
}