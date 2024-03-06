import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailOutlineicon from "@mui/icons-material/MailOutline";
import Workicon from "@mui/icons-material/Work";
import Mobileicon from "@mui/icons-material/PhoneAndroid";
import Locationicon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
import {NavLink,useNavigate} from 'react-router-dom'


const Detail = () => {
  const [getUserdata,setUserdata]= useState([])
  console.log(getUserdata)

  const Navigate = useNavigate()

  const {id} = useParams("");
  console.log(id)

  const getdata = async (e)=>{
    const res =await fetch(`https://mern-backend-0bgo.onrender.com/getuser/${id}`,{
      method:'GET',
      headers:{
        "Content-type":"application/json"
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
  const deleteuser = async (id)=>{
    const res2 = await fetch(`https://mern-backend-0bgo.onrender.com/deleteuser/${id}`,{
      method:'DELETE',
      headers:{
        "Content-type":"application/json"
      }
    })
    const deletedata = await res2.json();
    console.log(deletedata)
    if (res2.status === 422 || !deletedata) {
      console.log('error')
      
    } else {
      console.log("data deleted")
      Navigate('/')
    }
  }

  useEffect(()=>{
    getdata()
  },[])
  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome Nawazish Khan</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getUserdata._id}`}><button className="btn btn-primary mx-2">
              <CreateIcon />
            </button></NavLink>
            <button onClick={()=>deleteuser(getUserdata._id)} className="btn btn-danger">
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3">
                Name: <span>{getUserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getUserdata.age}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineicon /> Email: <span>{getUserdata.email}</span>
              </p>
              <p className="mt-3">
                <Workicon /> Occupation: <span>{getUserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <Mobileicon /> Mobile: <span>{getUserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <Locationicon /> Location:
                <span>{getUserdata.add}</span>
              </p>
              <p className="mt-3">
                Description:
                <span>{getUserdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
