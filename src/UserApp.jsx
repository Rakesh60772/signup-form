import React, { useState } from "react";
import axios from "axios";

function UserApp(){

  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    age:""
  });

  const [users,setUsers]=useState([]);

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/users",form)
      .then(()=>alert("User Registered"));
  };

  const loadUsers=()=>{
    axios.get("http://localhost:8080/users")
      .then(res=>setUsers(res.data));
  };

  return(
    <div className="container">

      <div className="card">
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" onChange={handleChange}/>
          <input name="email" placeholder="Email" onChange={handleChange}/>
          <input name="password" placeholder="Password" onChange={handleChange}/>
          <input name="phone" placeholder="Phone" onChange={handleChange}/>
          <input name="age" placeholder="Age" onChange={handleChange}/>
          <button type="submit">Signup</button>
        </form>
      </div>

      <button className="viewbtn" onClick={loadUsers}>View Users</button>

      <div className="usergrid">
        {users.map(u=>(
          <div className="usercard" key={u.id}>
            <h3>{u.name}</h3>
            <p>Email: {u.email}</p>
            <p>Phone: {u.phone}</p>
            <p>Age: {u.age}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default UserApp;
