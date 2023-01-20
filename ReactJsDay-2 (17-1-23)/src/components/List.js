import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function List({ employees, handleEdit, handleDelete , setEmployees}) {
    const [searchEmployee, setsearchEmployee] = useState('');
    const serachEmp = (e) => {
        setsearchEmployee(e);
    }

    const handleSearch = () => {
        const arr = [];
        let serachEmp = searchEmployee.toLowerCase();
        for (let i = 0; i < employees.length; i++) {
            if (JSON.stringify(employees[i]).toLocaleLowerCase().includes(serachEmp)) {
                arr.push(employees[i])
            }
        }
        setEmployees(arr);
    }

    const result = employees.length;
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 4;
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(result / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <div className="container">
            <div style={{ marginLeft: '60%' }} className="col-xm-10 col-sm-8 col-md-6 col-lg-4 d-flex">
                <input  className="form-control mr-sm-2 me-3" onChange={(e) => setsearchEmployee(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-primary" type="submit" onClick={() => handleSearch()}>Search</button>
            </div>
            <br></br>
            <table className="table table-bordered">
                <thead>
                    <tr >
                        <th>
                            No.
                        </th>
                        <th>
                            FirstName
                        </th>
                        <th>
                            LastName
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Gender
                        </th>
                        <th>
                            Department
                        </th>
                        <th>
                            Skills
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (employees
                        .slice(offset, offset + PER_PAGE)
                        .map((employee, i) => (
                            <tr key={employee.id}>
                                <td>{i + 1}</td>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.department}</td>
                                <td>{employee.skills} </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(employee.id)}
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </button>
                                    &nbsp;

                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br>
            </br>

            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />

            <div ><b> <h5>Total Employees = {result}</h5> </b></div>
            <br></br>
            <br></br>
        </div>
        
    )
}

export default List;