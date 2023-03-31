import axios from "axios";
import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Loader from "../Master/Loader";

export default class CreateSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: 0,
            time: "",
            date: "",
            loading: true,
            Connections: [],
            ScheduleList: []
        }
    }

    componentDidMount() {
        this.setState({
            Connections: this.props.Connections,
            ScheduleList: this.props.ScheduleList,
            loading: false
        });
    }

    onChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
        if(e.target.name == "userID")
            this.checkSchedule(e.target.value);
    }

    checkSchedule=(val)=>{
        if(this.state.ScheduleList.filter(s=>s.userID == val).length > 0){
            alert("The call is already scheduled with the user.");
            this.props.refresh();
        }
    }

    get Connections() {
        return this.props.Connections.map(c =>
            <option key={c.userID} value={c.userID}>{c.name}</option>
        )
    }

    CreateSchedule = (e) => {
        e.preventDefault();
        this.props.createSchedule(parseInt(this.state.userID),parseInt(localStorage.getItem("userID")),this.state.date,this.state.time);
        this.props.refresh();
    }

    render() {
        if (this.state.loading && this.state.Connections == [])
            return <Loader />
        else
            return (<div>
                <Button style={{ marginTop: 20 }} className="btn btn-primary" onClick={(e) => { this.props.Cancel() }}>Cancel</Button>
                <hr />
                <form onSubmit={this.CreateSchedule}>
                    <div className="form-group row">
                        <div className="col-md-4">Select User</div>
                        <div className="col-md-8">
                            <select name="userID" onChange={this.onChange} className="form-control col-md-8">
                                <option value={0}> - Select User - </option>
                                {this.Connections}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-4">Date</div>
                        <div className="col-md-8">
                            <input type="date" name="date" onChange={this.onChange} value={this.state.date} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-4">Time</div>
                        <div className="col-md-8">
                            {/* <input type="time" className="form-control" name="time" onChange={this.onChange} value={this.state.time} /> */}
                            <Form.Control type="time" className="form-control" name="time" onChange={this.onChange} value={this.state.time} /> 
                        </div>
                    </div>

                    <Button className="primary" type="submit">Create Schedule</Button>
                </form>
            </div>)
    }
}