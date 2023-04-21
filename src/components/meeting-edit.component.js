import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Select from 'react-select'

export default class EditMeeting extends Component {
    constructor(props) {
        super(props);
        this.onChangeParticipants = this.onChangeParticipants.bind(this);
        this.onChangePlatform = this.onChangePlatform.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            participants: [],
            platform: '',
            date: new Date(),
            time: '',
            names: [],
            options: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/meeting/' + this.props.meetingId)
            .then(response => {
                this.setState({
                    participants: response.data.participants,
                    platform: response.data.platform,
                    date: new Date(response.data.date),
                    time: response.data.time,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/employee/')
            .then(response => {

                this.setState({
                    names: response.data,
                })

                const tempOptions = [
                ]

                response.data.forEach((item) => {
                    let tempObject = {
                        value: item.name,
                        label: item.name
                    }

                    tempOptions.push(tempObject);
                })

                this.setState({
                    options: tempOptions
                })


            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeParticipants(choice) {
        let participantsArr = [];
        choice.forEach(participant => {
            participantsArr.push(participant.value);
        })
        console.log("participantsArr", participantsArr);
        this.setState({
            participants: participantsArr
        })
    }

    onChangePlatform(e) {
        this.setState({
            platform: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    onChangeTime(e) {
        this.setState({
            time: e.target.value
        });
    }

    refreshTable() {
        axios.get('http://localhost:5000/meeting/')
            .then(response => {
                this.setState({ meeting: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const meeting = {
            participants: this.state.participants,
            platform: this.state.platform,
            date: this.state.date,
            time: this.state.time,
        }

        console.log(meeting);
        axios.put('http://localhost:5000/meeting/' + this.props.meetingId, meeting)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.refreshTable();
                    this.props.close();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Meeting details has been updated!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#60e004'
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'There was an error updating!',
                        background: '#fff',
                        confirmButtonColor: '#133EFA',
                        iconColor: '#e00404'
                    })
                }
            })
    }

    render() {
        return (
            <div className="flex flex-col">
                <div className=" sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-32">
                                    <form className='px-10 py-6' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold uppercase text-emerald-900 drop-shadow-lg'>
                                                Update Meeting Details
                                            </p>
                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Meeting Platform : </label>
                                                <select type="text"
                                                    required
                                                    className="form-control "
                                                    value={this.state.platform}
                                                    onChange={this.onChangePlatform}
                                                >
                                                    <option>Select Platform</option>
                                                    <option>Zoom</option>
                                                    <option>MS-Teams</option>
                                                    <option>Google Meet</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Date : </label>
                                                    <div>
                                                        <DatePicker
                                                            className='m-2'
                                                            selected={this.state.date}
                                                            onChange={this.onChangeDate}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Time : </label>
                                                    <input type="time"
                                                        required
                                                        placeholder='Johnny'
                                                        className="form-control "
                                                        value={this.state.time}
                                                        onChange={this.onChangeTime}
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Participants : </label>
                                                <input type="text"
                                                    required
                                                    placeholder='Employee Name'
                                                    className="form-control"
                                                    value={this.state.participants}
                                                    onChange={this.onChangeParticipants}
                                                /><p />
                                            </div> */}

                                            <div className="form-group ">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">Names : </label>
                                                <Select
                                                    options={this.state.options}
                                                    isMulti
                                                    onChange={(choice) => this.onChangeParticipants(choice)}
                                                /><p />
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}