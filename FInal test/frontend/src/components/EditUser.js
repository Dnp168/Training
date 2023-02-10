import React, { useEffect, useState } from 'react'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function EditUser() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [photo, setPhoto] = useState('');
    const [country, setCountry] = useState('');
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState("");
    const pattern = new RegExp(/[A-Za-z]{3}[0-9]{3}/);
    const validate = new RegExp(/\S+@\S+\.\S+/);
    const navigate = useNavigate();
    const id = localStorage.getItem("code");
    const [ans, setAns] = useState([]);
    const [image, setImage] = useState('');
   


    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const getHobbies = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setHobbies([...hobbies, value])
        }
        else {
            setHobbies(hobbies.filter((e) => e !== value))
        }
    }

    function viewData() {
        // console.log(id);
        axios.post("http://localhost:8080/viewData",{ id }).then((res) => {
            const ans = res.data[0];
            // console.log(ans)
            let image=ans.photo.split('/');
            // console.log(image[image.length-1]);
            setImage(image[image.length-1]);
            setCode(ans.code)
            setFirstname(ans.firstname);
            setLastname(ans.lastname);
            setEmail(ans.email);
            setGender(ans.gender);
            setHobbies(ans.hobbies);
            setCountry(ans.country); 
        })
    }
    useEffect(() => {
        viewData()
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        if (code == "") {
            alert("Enter Code")
        } else if (!pattern.test(code)) {
            alert("Enter valid code")
        } else if (code.length > 6 || code.length < 6) {
            alert("Enter the 6 digits Code")
        } else if (firstname == "") {
            alert("Enter First name")
        } else if (lastname == "") {
            alert("Enter Last name")
        } else if (email == "") {
            alert("Enter the email address")
        } else if (!validate.test(email)) {
            alert("Enter valid email address")
        } else if (gender == "") {
            alert("Please select your gender")
        } else if (hobbies == "") {
            alert("Please select your hobbies")
        } else if (country == "") {
            alert("Please select the country")
        } 
        else {
            if(fileName){
            const formData = new FormData();
            formData.append("file", file);
            // console.log(formData);
            formData.append("fileName", fileName);
            console.log(fileName);
            axios.post("http://localhost:8080/addUser", formData).then((res) => {
            });}else{
                setFileName(image)
            }
            
            axios.post("http://localhost:8080/updateUser", { code, firstname, lastname, gender, hobbies, email, country, fileName:image }).then((res) => {
            });
            localStorage.clear();
            navigate("/")
        }
    }

    return (
        <div>
            <center>
                <h1>Update User</h1>
            </center>
            <img class='circular_image' src={`http://localhost:8080/getImage/${image}`} alt={image} height="150px" width="150px" border-radius="50%"/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="code">Code</label>
                    <input type="text" className="form-control" id="code" disabled value={code} placeholder="Enter Code (Format : USR001,USR002 )" onChange={(e) => { setCode(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" id="firstname" value={firstname} placeholder="Enter First Name" onChange={(e) => { setFirstname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" value={lastname} placeholder="Enter last Name" onChange={(e) => { setLastname(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" value={email} placeholder="Enter Email Address" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="gender">Gender: </label>&nbsp;
                    <input
                        id="male"
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => { setGender(e.target.value) }}
                        checked={gender == "male" ? "true" : null}
                    />
                    <label htmlFor="male" className='px-2'>Male</label>
                    &nbsp;
                    <input
                        id="female"
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender == "female" ? "true" : null}
                    />
                    <label htmlFor="female" className='px-2'>Female</label>
                </div>
                <br></br>
                <div>
                    <label htmlFor="hobbies">Hobbies: </label> &nbsp;
                    <input id="Reading"  type="checkbox" name="hobbies" value="Reading" onChange={getHobbies} checked={hobbies.includes("Reading") ? "true" : ""}/>&nbsp;
                    <label htmlFor="Reading">Reading</label>  &nbsp;&nbsp;
                    <input id="Gaming"  type="checkbox" name="hobbies" value="Gaming" onChange={getHobbies} checked={hobbies.includes("Gaming") ? "true" : ""}/>&nbsp;
                    <label htmlFor="Gaming">Gaming</label> &nbsp;&nbsp;
                    <input id="Coding"  type="checkbox" name="hobbies" value="Coding" onChange={getHobbies} checked={hobbies.includes("Coding") ? "true" : ""} />&nbsp;
                    <label htmlFor="Coding">Coding</label> &nbsp;&nbsp;
                    <input id="Drawing" type="checkbox" name="hobbies" value="Drawing" onChange={getHobbies} checked={hobbies.includes("Drawing")  ? "true" : ""} />&nbsp;
                    <label htmlFor="Drawing">Drawing</label> &nbsp;
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="photo">Select Image :</label>
                    <input type="file" name="file" onChange={saveFile} accept='image/*' />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                        id="country" className="form-select form-select-sm"
                        type="text"
                        name="country"
                        value={country}
                        onChange={e => {
                            setCountry(e.target.value)
                        }} >
                        <option value="select" >--select--</option>
                        <option value="india">India</option>
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                    </select>
                </div>
                <br></br>
                <input type="submit" className="btn btn-primary" value="Submit" /> &nbsp;
                <button className="btn btn-danger" onClick={() => {localStorage.clear(); navigate('/') }}>Back</button>
            </form>
        </div>
    )
}

export default EditUser;