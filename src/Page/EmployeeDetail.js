import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EmployeeDetails = (props) => {
  const employeeCollectionRef = collection(db, "employee");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  const addEmployee = async () => {
    await addDoc(employeeCollectionRef, {
      name: name,
      email: email,
      contact: Number(contact),
      dob: dob,
      address: address
    });
    setRender(true);
  };

  const updateEmployeeHandle = async (id, employee) => {
    const userDoc = doc(db, "employee", id);
    const newFields = {
      name: employee.name,
      email: employee.email,
      contact: employee.contact,
      dob: employee.dob,
      address: employee.address
    };
    await updateDoc(userDoc, newFields);
  };

  return (
    <div>
      {props.edit === true ? <h1>Edit Employee</h1> : <h1>Add Employee</h1>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between"
        }}
      >
        <div>
          Name:
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
            // value={props?.employee?.name}
            className="input"
            required
          />
        </div>
        <div>
          Email:
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={props?.employee?.email}
            className="input"
          />
        </div>

        <div>
          Contact :
          <input
            type="number"
            onChange={(event) => {
              setContact(event.target.value);
            }}
            value={props?.employee?.contact}
            className="input"
          />
        </div>
        <div>
          DOB :
          <input
            type="date"
            onChange={(event) => {
              setDob(event.target.value);
            }}
            value={props?.employee?.dob}
            className="input"
          />
        </div>
        <div>
          Address :
          <input
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            value={props?.employee?.address}
            className="input"
            style={{ height: "50px" }}
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={() => {
          addEmployee();
          navigate("/employeeList");
        }}
        style={{ width: "10vh", alignContent: "center" }}
      >
        {props.edit === true ? "update" : "Add"}
      </button>
    </div>
  );
};

export default EmployeeDetails;
