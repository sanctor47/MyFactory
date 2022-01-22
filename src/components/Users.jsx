import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import UserDataService from "../services/users.service";
import { doc } from "firebase/firestore";

function Users() {
  const [users, setUsers] = useState([]);
  const [id, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await UserDataService.getUser(id);
      console.log("the record is :", docSnap.data());
      setName(docSnap.data().name);
      setEmail(docSnap.data().email);
      setRole(docSnap.data().role);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const getUsers = async () => {
    const data = await UserDataService.getAllUsers();
    console.log(data.docs);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (name === "" || email === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newUser = {
      name,
      email,
      role,
    };
    console.log(newUser);

    try {
      if (id !== undefined && id !== "") {
        await UserDataService.updateUser(id, newUser);
        setUserId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await UserDataService.addUsers(newUser);
        setMessage({ error: false, msg: "New User added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setName("");
    setEmail("");
    setRole("");
    getUsers();
  };

  const deleteHandler = async (id) => {
    await UserDataService.deleteUser(id);
    getUsers();
  };

  return (
    <Section>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <h1>Add User`</h1>
        <span>Name</span>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <span>Email</span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <span>Role</span>
        <input type="text" onChange={(e) => setRole(e.target.value)} />
        <button type="submit">Add User</button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.role}</td>
                <td>
                  <button onClick={(e) => deleteHandler(doc.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Section>
  );
}

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
`;
const Form = styled.form`
  border: 1px solid white;
  padding: 10px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Table = styled.table`
  border: 1px solid white;
  color: white;
  width: 100%;
  
`;
export default Users;
