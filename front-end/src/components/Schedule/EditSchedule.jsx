import axios from "axios";
import { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import Loader from "../Master/Loader";

export default class EditSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 0,
            time: "",
            date: "",
            loading: true,
            Connections: [],
            currentSche: null
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            Connections: this.props.Connections,
            loading: false,
            currentSche: this.props.currentSche,
            time: this.props.currentSche.MeetingTime,
            date: this.props.currentSche.MeetingDate
        });
    }

    onChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
        if (e.target.name == "userID")
            this.checkSchedule();
    }

    checkSchedule = () => {
        if (this.props.Schedule.filter(s => s.userID == this.state.userID)) {
            alert("The call is already scheduled with the user.");
            this.props.refresh();
        }
    }

    // get Connections() {
    //     return this.props.Connections.map(c =>
    //         <option key={c.userID} value={c.userID}>{c.name}</option>
    //     )
    // }

    updateSchedule = () => {
        this.props.updateSchedule(parseInt(this.props.currentSche.id), this.state.date, this.state.time);
        this.props.refresh();
    }

    render() {
        if (this.state.loading && this.state.Connections == [])
            return <Loader />
        else
            return (
                <Modal show={this.props.editSchedule} onHide={this.props.Cancel} aria-labelledby="contained-modal-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Meeting with {this.props.currentSche.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group row">
                            <div className="col-md-4">Date</div>
                            <div className="col-md-8">
                                <input type="date" name="date" onChange={this.onChange} value={this.state.date} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-4">Time</div>
                            <div className="col-md-8">
                                <input type="time" className="form-control" name="time" onChange={this.onChange} value={this.state.time} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" onClick={(e) => { this.updateSchedule() }}>Update</Button>
                        <Button onClick={this.props.Cancel}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )
    }
}