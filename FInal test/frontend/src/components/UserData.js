import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

function Showdata({ item }) {
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let image = item.photo.split('/');
        // console.log(image[image.length - 1]);
        setImage(image[image.length - 1]);
    }, [])

    const view = (item) => {
        localStorage.setItem('code', item.code)
        navigate('/view');
    }

    const edit = (item) => {
        localStorage.setItem('code', item.code)
        navigate('/edit');
    }

    return (
        <tr key={item.recid}>
            <td>{item.recid}</td>
            <td><img class='circular_image' src={`http://localhost:8080/getImage/${image}`} alt={image} height="60px" width="60px" border-radius="50%" /></td>
            <td>{item.code}</td>
            <td>{item.firstname + " " + item.lastname}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.hobbies}</td>
            <td>{item.dateadded}</td>
            <td>{item.status}</td>
            <td><button className="btn btn-primary" onClick={() => { view(item) }}>View</button>&nbsp;
                <button className="btn btn-primary" onClick={() => { edit(item) }}>Edit</button>&nbsp;
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    )
}

function UserData() {
    const [ans, setAns] = useState('');
    const navigate = useNavigate();
    // const [page, setPage] = useState(1);
    // const [pageCount, setPageCount] = useState(0);
    // const [imagesOffset, setImagesOffset] = useState(0);
    // const endOffset = imagesOffset + 8;
    // setPageCount(Math.ceil(ans.length / 8));

    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * 8) % ans.length;
    //     setImagesOffset(newOffset);
    // };
    // const [currentPage, setCurrentPage] = useState(0);
    // const PER_PAGE = 4;
    // const offset = currentPage * PER_PAGE;
    // const pageCount = Math.ceil(ans.length / PER_PAGE);

    // function handlePageClick({ selected: selectedPage }) {
    //     setCurrentPage(selectedPage);
    // }

    function getData() {
        axios.get("http://localhost:8080/getdata").then((res) => {
            const ans = res.data;
            console.log(ans)
            setAns(ans);
        })
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <div>
            <center><h2>User Data</h2></center>
            <div style={{ marginTop: '30px', marginBottom: '18px' }}>
                <button style={{ marginLeft: '90%' }} className='btn btn-primary' onClick={() => { navigate('/addUser') }}>Add User</button>
            </div>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>No.</th>
                        <th>Image</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                        <th>Date Added</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {
                        ans.length > 0 ? (
                            ans
                               
                                .map((item) => (
                                    <Showdata item={item} />
                                ))
                        ) : <></>
                    }
                </tbody>
            </table>
            <div className="pagination">
                {/* <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                /> */}
            </div>
        </div>
    )
}

export default UserData;