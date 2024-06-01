"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../../../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

async function getData(id) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=1&id=${id}`
  );
  if (!res.ok) {
    throw new Error("cannot fetch");
  }
  return res.json();
}

export default function SelectedImage({ params }) {
  const orderREF = collection(db, "collection");
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);

  async function getINFO() {
    const data = await getData(params.slug);
    setData(data);
  }

  async function fetchOrders() {
    const data = await getDocs(orderREF);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  useEffect(() => {
    fetchOrders();
  }, [addition]);
  useEffect(() => {
    getINFO();
    fetchOrders();
  }, []);

  async function addition(item) {
    const existingOrder = orders.find((order) => order.itemid === item.id);
    if (existingOrder) {
      console.log(existingOrder, "exiting");
      const orderDoc = doc(db, "collection", existingOrder.id);
      const newQuantity = existingOrder.quantity + 1;
      try {
        await updateDoc(orderDoc, { quantity: newQuantity });
        existingOrder.quantity = newQuantity;
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      try {
        await addDoc(orderREF, {
          itemid: item.id,
          title: item.title,
          url: item.url,
          quantity: 1,
          price: 999,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center font-bold text-3xl">Selected Image</h1>
      <div>
        {data.map((item, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex justify-center">
              <Image
                className="rounded-xl"
                priority={true}
                src={item.url}
                width={1000}
                height={1000}
                alt={item.title}
              />
            </div>
            <div>
              <h1 className="font-bold text-2xl sm:text-4xl mb-2">
                {item.title}
              </h1>
              <p className="text-lg sm:text-xl mb-2">
                9999 THB{" "}
                <span className="bg-red-500 text-white py-1 px-3 rounded-xl">
                  Sale
                </span>
              </p>
              <p className="mb-2">
                <span className="underline cursor-pointer">Shipping</span>{" "}
                calculated at checkout.
              </p>
              <p className="mb-2">Owner: Tew</p>
              <p className="mb-2">Contact: tew666@gmail.com</p>
              <button
                onClick={() => {
                  addition(item);
                }}
                className="w-full py-2 border-black border-2 rounded-full mb-2"
              >
                Add to cart
              </button>
              <p className="mb-2 text-sm sm:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, <br />
                <br /> when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not
                only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
