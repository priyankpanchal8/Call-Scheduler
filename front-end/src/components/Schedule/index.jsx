import { Component } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import Loader from "../Master/Loader";
import CreateSchedule from "./CreateSchedule";
import EditSchedule from "./EditSchedule";

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CreateSchedule: false,
            fetching: true,
            AddSchedule: false,
            editSchedule: false,
            currentSche: null
        }
    }
    componentDidMount() {
        this.props.setHeaderText("Schedule");
        console.log(this.props);
        this.refresh();
    }

    componentWillReceiveProps() {
        console.log("componentWillReceiveProps");
    }

    deleteSch = (id) => {
        if (window.confirm("Are you sure you want to cancel the call?"))
        this.props.deleteSchedule(id);
    }

    get Schedule() {
        let schedules = this.props.ScheduleList;
        return schedules.map(u =>
            <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.MeetingDate}</td>
                <td>{u.MeetingTime}</td>
                <td>
                    <a className="OrangeLink" href="#" onClick={(e) => { this.setState({ currentSche: u, editSchedule: true }) }}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </a> &nbsp;&nbsp;&nbsp;
                    <a className="OrangeLink" href="#" onClick={(e) => { this.deleteSch(u.id); }}>
                        <i className="fa-solid fa-trash-can"></i>
                    </a>
                </td>
            </tr>
        )
    }

    refresh = () => {
        this.props.getAllSchedules();
        this.Cancel();
    }

    Cancel = () => {
        this.setState({ AddSchedule: false, editSchedule: false });
    }

    render() {
        if (this.props.fetching)
            return (<Loader />);
        // else {
            if (this.state.AddSchedule)
                return <CreateSchedule ScheduleList={this.props.ScheduleList} Connections={this.props.Connections} Cancel={this.Cancel} refresh={this.refresh} createSchedule={this.props.createSchedule} />
            else
                return (
                    <div>
                        <Button style={{ marginTop: 20 }} className="btn btn-primary" onClick={(e) => { this.setState({ AddSchedule: true }) }}>Add Schedule</Button>
                        <hr />
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Date</td>
                                    <td>Time</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.Schedule}
                            </tbody>
                        </Table>
                        {this.state.editSchedule ? <EditSchedule updateSchedule={this.props.updateSchedule} editSchedule={this.state.editSchedule} currentSche={this.state.currentSche} refresh={this.refresh} Cancel={this.Cancel} /> : ""}
                    </div>
                )
        }
    // }
}