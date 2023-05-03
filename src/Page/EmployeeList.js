import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,

  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import EmployeeDetails from "./EmployeeDetail";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesClone, setEmployeesClone] = useState([]);
  const [singleEmployee, setSingleEmp] = useState("");
  const [render, setRender] = useState(false);

  const employeeCollectionRef = collection(db, "employee");

  const getEmployeeFromFirebase = async () => {
    const data = await getDocs(employeeCollectionRef);
    console.log(data, "here");
    setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setEmployeesClone(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getEmployeeFromFirebase();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    const userDoc = doc(db, "employee", id);
    await deleteDoc(userDoc);
    setRender(true);
  };

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/employeeDetails");
  };

  const filterData = (searchValue) => {
    const filteredData = employeesClone.filter((data, index) => {
      return data.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setEmployees(filteredData);
  };

  useEffect(() => {
    filterData(searchTerm);
  }, [searchTerm]);

  const updateEmployee = async (id, employee) => {
    const userDoc = doc(db, "employee", id);
    const newFields = {
      name: employee.name,
      email: employee.email,
      contact: employee.contact,
      dob: employee.dob,
      address: employee.address
    };
    await updateDoc(userDoc, newFields);
    setSingleEmp(employee);
    setEdit(!false);
  };

  return (
    <>
      <div>
        <div>
          <span>Employee Personal Details</span>
          <span>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              style={{ marginLeft: "17%", marginBottom: "1%" }}
            />
          </span>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th> Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact No</th>
                <th>DOB</th>
                <th> Address</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, id) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.contact}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.address}</td>
                  <button onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                  <button onClick={() => updateEmployee(employee.id, employee)}>
                    Edit
                  </button>
                  <button onClick={() => handleAdd()}>Add</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {edit && <EmployeeDetails employee={singleEmployee} edit={edit} />}
    </>
  );
};

export default EmployeeList;
