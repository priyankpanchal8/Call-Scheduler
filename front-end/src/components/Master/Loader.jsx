import { Component } from 'react';
import loading from '../../Fidget-spinner.gif';

export default class Loader extends Component {
    render() {
        return (
            <center className='loader'>
                <img src={loading} alt="Loading..." />
            </center>
        )
    }
}