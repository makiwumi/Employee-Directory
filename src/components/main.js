import React, { Component } from "react"
import API from "../utils/API";
import SearchBar from "./SearchBar"
import TableData from "./TableData"
import "../style/main.css";

class Main extends Component {
    //Empty strings that loads employees in that order while filtered
    state = {
        search: "",
        employees: [],
        filteredEmployees: [],
        order: ""

    };

    // initial loading
    componentDidMount() {
        API.getUsers().then(res => this.setState({
            employees: res.data.results,
            filteredEmployees: res.data.results
        })).catch(err => console.log(err))
    }

    //sort by Name aphabetically/reverse

    sortByName = () => {
        const filtereds = this.state.filteredEmployees;
        if (this.state.order === "asc") {
            const sorteds = filtereds.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            console.log(sorteds)

            this.setState({
                filteredEmployees: sorteds,
                order: "desc"
            })
        } else {

            const sorteds = filtereds.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1)
            console.log(sorteds)

            this.setState({
                filteredEmployees: sorteds,
                order: "asc"
            })

        }
    }
    //filtering ppl as the name is being searched
    handleInputChange = event => {

        const employees = this.state.employees;
        const UserInput = event.target.value;
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().indexOf(UserInput.toLowerCase()) > -1
        )
        this.setState({
          //state changes results to filtered employees

            filteredEmployees,

        });


    };


    //API call when page is loaded
    employeeSearch = () => {
        API.getUsers()
            .then(res => this.setState({
                //to keep all employees even tho some are filtered to be viewed
                filteredEmployees: res.data.results,
                employees: res.data.results
            }))
            .catch(err => console.log(err))
    }

    //when button search is clicked
    handleSearch = event => {
        event.preventDefault();
        if (!this.state.search) {
            alert("Enter a name")
        }
        const { employees, search } = this.state;

        //filters by searched item
        const filteredEmployees = employees.filter(employee => employee.name.first.toLowerCase().includes(search.toLowerCase()));

        this.setState({
            filteredEmployees
        });
    }



    render() {

        return (
            <div>

                <SearchBar
                    employee={this.state.employees}
                    handleSearch={this.handleSearch}
                    handleInputChange={this.handleInputChange} />
                <TableData results={this.state.filteredEmployees}
                    sortByName={this.sortByName}

                />
            </div >


        )
    }
}

export default Main