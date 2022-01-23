import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import OrderDataService from "../services/orders.service";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [id, setOrderId] = useState("");
  const [number, setNumber] = useState("");
  const [tooling, setTooling] = useState("");
  const [material, setMaterial] = useState("");
  const [qty, setQty] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getOrders();
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
      const docSnap = await OrderDataService.getOrder(id);
      console.log("the record is :", docSnap.data());
      setNumber(docSnap.data().number);
      setTooling(docSnap.data().tooling);
      setMaterial(docSnap.data().material);
      setQty(docSnap.data().qty);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const getOrders = async () => {
    const data = await OrderDataService.getAllOrders();
    console.log(data.docs);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (number === "" || tooling === "" || material === ""|| qty === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newOrder = {
      number,
      tooling,
      material,
      qty
    };
    console.log(newOrder);

    try {
      if (id !== undefined && id !== "") {
        await OrderDataService.updateOrder(id, newOrder);
        setOrderId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await OrderDataService.addOrders(newOrder);
        setMessage({ error: false, msg: "New Order added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setNumber("");
    setTooling("");
    setMaterial("");
    setQty("");
    getOrders();
  };

  const deleteHandler = async (id) => {
    await OrderDataService.deleteOrder(id);
    getOrders();
  };

  return (
    <Section>
      <Navbar />
      <Form onSubmit={handleSubmit}>
        <h1>New Order</h1>
        <span>Number</span>
        <input type="text" onChange={(e) => setNumber(e.target.value)} />
        <span>Tooling</span>
        <input type="text" onChange={(e) => setTooling(e.target.value)} />
        <span>Material</span>
        <input type="text" onChange={(e) => setMaterial(e.target.value)} />
        <span>Qty</span>
        <input type="text" onChange={(e) => setQty(e.target.value)} />
        <button type="submit">Add Order</button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>M/O</th>
            <th>Tooling</th>
            <th>Material</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.number}</td>
                <td>{doc.tooling}</td>
                <td>{doc.material}</td>
                <td>{doc.qty}</td>
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
  button{
      margin: 10px;
  }
`;

const Table = styled.table`
  border: 1px solid white;
  color: white;
  width: 100%;
  
`;
export default Orders;
