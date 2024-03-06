import React, {useState,useEffect, useContext} from 'react'
import { NavLink,useParams,useNavigate } from "react-router-dom";
import { updatedata } from './context/ContextProvider';
// import {  } from "react-router";



const Edit = () => {
  // const [getUserdata,setUserdata]= useState([])
  // console.log(getUserdata)

  const {updata,setUpdata} = useContext(updatedata)
  const history = useNavigate()

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

    const {id} = useParams("");
    console.log(id)
  
    const getdata = async ()=>{
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
        setinp(data)
        console.log(" GET data")
      }
  
    }
  
    useEffect(()=>{
      getdata();
    },[]);

    const updateuser = async(e)=>{
      e.preventDefault();
      const {name,email,age,mobile,work,add,desc}=INPVAL

      const res2 = await fetch(`https://mern-backend-0bgo.onrender.com/updateuser/${id}`,{
        method:'PATCH',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          name,email,age,mobile,work,add,desc
        })
      });
      const data2 = await res2.json()
      console.log(data2);
      if (res2.status === 422 || !data2) {
        console.log('fill the data')
        
      } else {
        // setinp(data2)
        history('/')
        setUpdata(data2)

      }
    }

  return (
    <div className="container">
      <NavLink to={"/"}>Home</NavLink>
      {/* <htmlForm> */}
        <form className='mt-4'>
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
        <button onClick={updateuser} type="submit" className="btn btn-primary">
          Submit
        </button>
        </div>
      {/* </htmlForm> */}
      </form>
    </div>
  )
}

export default Edit
