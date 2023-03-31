import { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Alert, Button } from "react-bootstrap";
import Loader from "./Master/Loader";

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
};

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            statuss: "",
            message: ""
        }
    }
    componentDidMount() {
        this.props.setHeaderText("Welcome");
        console.log(this.props);
        // this.props.getDetails();
        axios.get(`http://localhost:8000/api/userDetails/${parseInt(localStorage.getItem("userID"))}`, config).then(
            resp => {
                this.setState({
                    firstname: resp.data.firstname,
                    lastname: resp.data.lastname
                })
                return Promise.resolve();
            }, err => {
                console.error(err);
                return Promise.reject(err);
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/editUser/${parseInt(localStorage.getItem("userID"))}`, {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }, config).then(
            resp => {
                this.setState({
                    statuss: resp.data.status,
                    message: resp.data.message
                });
            }, err => {
                console.error(err);
                return Promise.reject(err);
            }
        )
    }

    onChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    get renderMessage() {
        if (this.state.statuss === "success")
            return <Alert variant="success">
                {this.state.message}
            </Alert>
        else if (this.state.statuss === "error")
            return <Alert variant="danger">
                {this.state.message}
            </Alert>
        else
            return <Alert variant="info">
                Edit your personal details below.
            </Alert>
    }

    render() {
        if (this.state.fetching)
            return (<Loader />);
        else
            return (
                <div>
                    <div className="LoginBody">
                        <div className="LoginForm">
                            <div className="ErrorArea">
                                {this.renderMessage}
                            </div>
                            <div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-md-4">First Name</div>
                                        <div className="col-md-8">
                                            <input type="text" required name="firstname" className="form-control" onChange={this.onChange} value={this.state.firstname} placeholder="First Name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-4">Last Name</div>
                                        <div className="col-md-8">
                                            <input type="text" required name="lastname" className="form-control" onChange={this.onChange} value={this.state.lastname} placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <Button className="primary" type="submit">Update</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}