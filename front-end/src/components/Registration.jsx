import { Component } from "react";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import { redirect } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Email: "",
            Password: "",
            LoginMessage: "",
            firstName: "",
            lastName: "",
            ConfirmPassword: "",
            Redirect: true
        }
    }

    componentDidMount(){
        this.props.setHeaderText("Registration");
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
        axios.post('http://localhost:8000/api/register', {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.Email,
            password: this.state.Password,
            password_confirmation: this.state.ConfirmPassword
        }).then(
            resp => {
                // this.setState({ token: resp.data.access_token });
                window.location.href = "/login";
            }, err => {
                alert(err.response.data.error);
                console.error(err);
            }
        )
        this.setState({ Redirect: true });
    }

    get RenderError() {
        if (this.state.LoginMessage !== "") {
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
                        Please enter your details to register.
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
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" required name="firstName" className="form-control" onChange={this.onChange} value={this.state.firstName} placeholder="First Name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" required name="lastName" className="form-control" onChange={this.onChange} value={this.state.lastName} placeholder="Last Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" required name="Email" className="form-control" onChange={this.onChange} value={this.state.Email} placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <input type="password" required name="Password" className="form-control" onChange={this.onChange} value={this.state.Password} placeholder="Password" />
                                </div>
                                <div className="form-group">
                                    <input type="password" required name="ConfirmPassword" className="form-control" onChange={this.onChange} value={this.state.ConfirmPassword} placeholder="Confirm Password" />
                                </div>
                                <Button className="primary" type="submit">Register</Button>
                            </form>
                            {this.state.redirect ? (<redirect push to="/" />) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}