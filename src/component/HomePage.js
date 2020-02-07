import React, { Component } from 'react'
import axios from 'axios'

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            vehicleDetails: []
        }
    }



    submitForm = (event) => {
        event.preventDefault();

        var url = "http://localhost:8080/vins/getDetails/?inputValue=" + this.state.name;
        console.log(url);
        axios
            .post(url)
            .then(res => {
                const details = res.data;
                this.setState({ vehicleDetails: details });
                console.log(res.data);
                console.log(this.state.vehicleDetails);
                // this.setState({})

            });


    }

    handleChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            vehicleDetails: []
        });
    };

    displayOwnerRows() {
        console.log(this.state.vehicleDetails)
        console.log(this.state.name)
        if (this.state.name === "") {
            return (<div>No items are available</div>);

        }

        return this.state.vehicleDetails.map(d => {
            return (
                <tr key={d.id}>
                    <td>{d.value === "null" ? <div style={{ fontWeight: "bold" }}>not available</div> : d.value}</td>
                    <td>{d.valueId === "null" ? <div style={{ fontWeight: "bold" }}>not available</div> : d.valueId}</td>
                    <td>{d.variableId === "null" ? <div style={{ fontWeight: "bold" }}>not available</div> : d.variableId}</td>
                    <td>{d.variable === "null" ? <div style={{ fontWeight: "bold" }}>not available</div> : d.variable}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="container">
                    <h2>Vehicle vin number details</h2>
                    <br></br>
                    <form onSubmit={this.submitForm}>
                        Enter vin number : <input type="text" name="name" onChange={this.handleChange} /><br></br>
                        <br></br>
                        <button className="btn btn-primary">submit</button>
                    </form>
                </div>
                <div className="container"><br></br>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Value</th>
                                <th scope="col">ValueId</th>
                                <th scope="col">VariableId</th>
                                <th scope="col">Variable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayOwnerRows()}
                        </tbody>
                    </table>
                </div>

            </div>

        )
    }
}
