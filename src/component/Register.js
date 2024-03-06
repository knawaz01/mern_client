import React, { useContext, useState } from "react";
import {NavLink,useNavigate} from 'react-router-dom'
import { adddata } from "./context/ContextProvider";
const Register = () => {

  const {udata,setUdata} = useContext(adddata)

  const history = useNavigate();
    const [INPVAL,setinp] = useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        add:"",
        desc:""
    })
    const setData=(e)=>{

        console.log(e.target.value)
        const {name,value} = e.target;
        setinp((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }
    const addinpdata = async (e)=>{
      e.preventDefault();
      const {name,email,age,mobile,work,add,desc} =INPVAL
      const res =await fetch('https://mern-backend-0bgo.onrender.com/register',{
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          name,email,age,mobile,work,add,desc
        })
      })
      const data = await res.json();
      console.log(data)
      if (res.status === 422 || !data) {
        console.log('error')
        alert("error")
      } else {
        history('/')
        setUdata(data)
        console.log("data added")
      }

    }
  return (
    <div className="container">
      <NavLink to={"/"}>Home</NavLink>
      <form>
        <div className="row">
        
        <div className="mb-3 col-lg-6 col-md-6 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            value={INPVAL.name}
            onChange={setData}
            name="name"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
           value={INPVAL.email}
           onChange={setData}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Age
          </label>
          <input
           value={INPVAL.age}
           onChange={setData}
          name="age"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Mobile
          </label>
          <input
           value={INPVAL.mobile}
           onChange={setData}
          name="mobile"
            type="number"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Work
          </label>
          <input
           value={INPVAL.work}
           onChange={setData}
          name="work"
            type="text col-lg-6 col-md-6 col-12"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Address
          </label>
          <input
           value={INPVAL.add}
           onChange={setData}
          name="add"
            type="text col-lg-6 col-md-6 col-12"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 col-lg-12 col-md-12 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <textarea  value={INPVAL.desc} onChange={setData} name="desc" className="form-control" cols={30} rows={5}></textarea>
        </div>
        <button type="submit" onClick={addinpdata} className="btn btn-primary">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
