import { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import Loader from "../Master/Loader";

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true
        }
    }
    componentDidMount() {
        this.props.setHeaderText("All Users");
        this.refresh();
    }

    refresh = () => {
        this.props.getAllUsers();
    }

    Connect = (id) => {
        this.props.connectUser(parseInt(localStorage.getItem("userID")), id);
    }

    disconnect = (userID) => {
        if (window.confirm("Do you want to disconnect with the user?"))
            this.props.disConnect(parseInt(localStorage.getItem("userID")), userID);
    }

    get Users() {
        if (this.props.Users === [])
            return <tr> No Users </tr>;
        else {
            let users = this.props.Users.filter(u => u.id !== parseInt(localStorage.getItem("userID")));
            return users.map(u =>
                <tr key={u.id}>
                    <td>{u.firstname} {u.lastname}</td>
                    <td>
                        {
                            this.props.Connection.filter(c => c.userID === u.id).length > 0 ?
                                <Button className="btn btn-danger" onClick={(e) => { this.disconnect(u.id) }}>Remove Connection</Button>
                                :
                                <Button className="btn btn-secondary" onClick={(e) => { this.Connect(u.id) }}>Connect</Button>
                        }
                    </td>
                </tr>
            )
        }
    }
    render() {
        if (this.props.fetching)
            return (<Loader />);
        else
            return (
                <div>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.Users}
                        </tbody>
                    </Table>

                </div>
            )
    }
}