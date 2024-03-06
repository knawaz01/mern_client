import React, { useEffect, useState,useContext } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { NavLink } from 'react-router-dom'
import { adddata } from "./context/ContextProvider";
import { updatedata } from "./context/ContextProvider";
import { deletedata } from "./context/ContextProvider";


const Home = () => {
  const [getUserdata, setUserdata] = useState([])
  console.log(getUserdata);

  const { udata, setUdata } = useContext(adddata)
  const {updata,setUpdata} = useContext(updatedata)
  const {dltdata,setDLTdata} = useContext(deletedata)

  
  const getdata = async (e) => {
    const res = await fetch('https://mern-backend-0bgo.onrender.com/getdata', {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    })
    const data = await res.json();
    console.log(data)
    if (res.status === 422 || !data) {
      console.log('error')

    } else {
      setUserdata(data)
      console.log(" GET data")
    }

  }

  useEffect(() => {
     getdata()
  }, [])

  const deleteuser = async (id) => {
    const res2 = await fetch(`https://mern-backend-0bgo.onrender.com/deleteuser/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      }
    })
    const deletedata = await res2.json();
    console.log(deletedata)
    if (res2.status === 422 || !deletedata) {
      console.log('error')

    } else {
      console.log("data deleted")
      setDLTdata(deletedata)
      getdata()
    }
  }


  return (
    <>
    {
        udata ?
        <>
          
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{udata.name}</strong> added successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> 
            </>: ""
      }
      {
        updata ?
        <>
          
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{updata.name}</strong> update successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> 
            </>: ""
      }
      {
        dltdata ?
        <>
          
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>{dltdata.name}</strong> Deleted successfully.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> 
            </>: ""
      }
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-5">
            <NavLink to={"/register"} className="btn btn-primary mb-3">Add Data</NavLink>
          </div>

            <table className="table ">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Id</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Job</th>
                  <th scope="col">Number</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                getUserdata.map((element, id) => {
                  return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>
                      <td>{element.work}</td>
                      <td>{element.mobile}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                        <NavLink to={`edit/${element._id}`}><button className="btn btn-primary"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                      </td>
                    </tr>
                  </>
                )
                })
                }



              </tbody>
            </table>
          </div> 
      </div>
    </>
  );
};

export default Home;
