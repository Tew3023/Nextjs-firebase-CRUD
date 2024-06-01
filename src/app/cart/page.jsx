"use client";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Image from "next/image";

export default function Cart() {
  const [orders, setOrders] = useState([]);
  const orderREF = collection(db, "collection");

  async function getData() {
    const data = await getDocs(orderREF);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getData();
  }, []);

  async function DeleteOrder(id) {
    const orderDoc = doc(db, "collection", id);
    await deleteDoc(orderDoc);
    alert("Order deleted");
    getData(); 
  }

  async function addQuantity(id, quantity) {
    const orderDoc = doc(db, "collection", id);
    const newQuantity = { quantity: quantity + 1 };
    await updateDoc(orderDoc, newQuantity);
    getData(); 
  }

  async function minusQuantity(id, quantity) {
    const orderDoc = doc(db, "collection", id);
    const newQuantity = { quantity: Math.max(quantity - 1, 1) }; 
    await updateDoc(orderDoc, newQuantity);
    getData(); 
  }

  orders.forEach(order => {
    order.totalPrice = order.quantity * (order.price || 0);
  });

  const suntotal = orders.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="container mx-auto px-24 max-[1024px]:px-5">
      <h1 className="font-bold text-xl sm:text-3xl">Your cart</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Image</th>
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr className="text-center border-b" key={order.id}>
                  <td className="p-2 flex justify-center">
                    <Image
                      priority={true}
                      src={order.url}
                      alt={order.title}
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </td>
                  <td className="p-2">{order.title}</td>
                  <td className="p-2">
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={() => minusQuantity(order.id, order.quantity)}
                        sx={{
                          minWidth: "24px",
                          padding: "4px",
                          marginRight: "4px",
                        }}
                        variant="contained"
                      >
                        -
                      </Button>
                      {order.quantity}
                      <Button
                        onClick={() => addQuantity(order.id, order.quantity)}
                        sx={{
                          minWidth: "24px",
                          padding: "4px",
                          marginLeft: "4px",
                        }}
                        variant="contained"
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="p-2">{order.totalPrice} THB</td>
                  <td className="p-2">
                    <Button
                      onClick={() => DeleteOrder(order.id)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-md text-gray-600 font-bold p-5"
                >
                  Your Cart Is Empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-end">Subtotal: {suntotal} THB</p>
      <div className="text-end">
        <p className="mb-3">Taxes and shipping calculated at checkout</p>
        <button className="text-md bg-black text-white w-full sm:w-60 h-10 rounded-full">
          Check out
        </button>
      </div>
    </div>
  );
}
