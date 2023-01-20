import React, { useState } from "react";
import Swal from 'sweetalert2';

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
    const id = selectedEmployee.id;
    const [firstname, setFirstName] = useState(selectedEmployee.firstname);
    const [lastname, setLastName] = useState(selectedEmployee.lastname);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [phone, setPhone] = useState(selectedEmployee.phone);
    const [gender, setGender] = useState(selectedEmployee.gender);
    const [department, setDepartment] = useState(selectedEmployee.department);
    const [skills, setSkills] = useState([selectedEmployee.skills]);
    const [about, setAbouts] = useState(selectedEmployee.about);

    const getSkills = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setSkills([...skills, value])

        }
        else {
            setSkills(skills.filter((e) => e !== value))
        }
    }

    const handleUpdate = e => {


        if (!firstname || !lastname || !email) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }



        const employee = {
            id,
            firstname,
            lastname,
            email,
            phone,
            gender,
            department,
            skills,
            about
        };

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                employees.splice(i, 1, employee);
                break;
            }
        }

        setEmployees(employees);
        setIsEditing(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${employee.firstname} ${employee.lastname}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <center><h1>Update Employee</h1></center>
                <br></br>
                <div className="row g-3">
                    <div className="col">
                        <label htmlFor="firstname">First Name: </label>
                        <input
                            id="firstname" className="form-control"
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => { setFirstName(e.target.value) }}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="lastname">Last Name: </label>
                        <input
                            id="lastname" className="form-control"
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => { setLastName(e.target.value) }}
                        />
                    </div>
                </div>
                <br></br>
                <div className="row g-3">
                    <div className="col">
                        <label htmlFor="email">Email: </label>
                        <input
                            id="email" className="form-control"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        /></div>
                    <div className="col">
                        <label htmlFor="phone">Phone: </label>
                        <input
                            id="phone" className="form-control"
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        /></div>
                </div>
                <br></br>
                <div>
                    <label htmlFor="gender">Gender: </label>&nbsp;
                    <input
                        id="male"
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => { setGender(e.target.value) }}

                    />
                    <label htmlFor="male" className='px-2'>Male</label>
                    &nbsp;
                    <input
                        id="female"
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}

                    />
                    <label htmlFor="female" className='px-2'>Female</label>
                </div>
                <br></br>
                <div> <label htmlFor="department">Department: </label>
                    <select class="form-select form-select-sm"
                        id="department"
                        type="text"
                        name="department"
                        value={department}
                        onChange={e => { setDepartment(e.target.value) }} >

                        <option value="PHP">PHP</option>
                        <option value=".NET">.Net</option>
                        <option value="SEO">SEO</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Admin/HR">Admin/HR</option>
                        <option value="Account">Account</option>
                    </select>
                </div>
                <br></br>
                <div>
                    <label htmlFor="skills">Skills: </label> &nbsp;

                    <input id="skills" type="checkbox" name="Programming" value="Programming" onChange={getSkills} />
                    <label htmlFor="Programming">Programming</label>  &nbsp;
                    <input id="skills" type="checkbox" name="Communication" value="Communication" onChange={getSkills} />
                    <label htmlFor="Communication">Communication</label> &nbsp;
                    <input id="skills" type="checkbox" name="ProCommunication" value="ProCommunication" onChange={getSkills} />
                    <label htmlFor="ProCommunication">ProCommunication</label> &nbsp;
                    <input id="skills" type="checkbox" name="Finance" value="Finance" onChange={getSkills} />
                    <label htmlFor="Finance">Finance</label> &nbsp;
                    <input id="skills" type="checkbox" name="Recruitment" value="Recruitment" onChange={getSkills} />
                    <label htmlFor="Recruitment">Recruitment</label> &nbsp;
                </div>
                <br></br>
                <div className="col-12">
                    <label className="form-label" htmlFor="about">About: </label>
                    <input
                        id="about" className="form-control"
                        type="text"
                        name="about"
                        value={about}
                        onChange={e => { setAbouts(e.target.value) }}
                    />
                </div>
                <center>
                    <div style={{ marginTop: '30px' }}>
                        <input type="submit" className="btn btn-primary" value="Update" />
                        <input
                            style={{ marginLeft: '12px' }}
                            className="btn btn-danger"
                            type="button"
                            value="Cancel"
                            onClick={() => setIsEditing(false)}
                        />
                    </div>
                </center>
            </form>

        </div>
    )
}

export default Edit;