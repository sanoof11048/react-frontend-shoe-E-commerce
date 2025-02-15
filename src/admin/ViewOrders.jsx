import React, { useEffect, useState } from "react";
import axios from "axios";
import SideDash from "./SideDash";

function ViewOrders() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      const usersData = res.data;
      setUsers(usersData);
    });
  }, []);

  const handleRemove = (productId, userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            orders: user.orders.filter((order) => order.id !== productId),
          }
        : user
    );

    const updatedUser = updatedUsers.find((user) => user.id === userId);
    axios
      .patch(`http://localhost:3000/users/${userId}`, {
        orders: updatedUser.orders,
      })
      .then(() => {
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating the orders:", error);
      });
  };

  const handleStatus = (productId, userId, newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            orders: user.orders.map((order) =>
              order.id === productId ? { ...order, status: newStatus } : order
            ),
          }
        : user
    );

    const updatedUser = updatedUsers.find((user) => user.id === userId);

    axios
      .patch(`http://localhost:3000/users/${userId}`, {
        orders: updatedUser.orders,
      })
      .then(() => {
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error updating the status:", error);
      });
  };

  return (
    <div className="flex min-h-screen">
        <div className="w-1/5 bg-gray-600 text-white">
          <SideDash/>
        </div>
    <div className="h-full w-full">
      <div className="bg-beige pt-4 min-h-screen ">
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-8">Orders</h1>
        {users
          .filter((user) => user.orders && user.orders.length > 0)
          .map((user, index) => (
            <div key={index} className="mb-8">
              <div className="m-10 bg-gray-700 rounded-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-300 pt-10">
                  Customer Name: {user.name}
                </h2>
                {user.orders.map((order) => (
                  <li
                    key={order.id}
                    className="flex justify-center   items-center py-3"
                  >
                    <div className="flex flex-col md:flex-row items-center md:w-fit w-5/6 pb-3  md:pb-2 md:pt-2 bg-[#fafafa] rounded-2xl ps-10 pe-10">
                      <img
                        src={order.image_url}
                        alt={order.name}
                        className="w-60 h-60 m-2 object-cover mr-4"
                      />
                      <div className="mt-4 md:mt-0">
                        <h3 className="text-xl text-center mb-4">
                          {order.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Sizes: {order.size ? order.size.join(", ") : "N/A"}
                        </p>
                        <p className="text-gray-900 font-bold">
                          ${order.price}.00
                        </p>
                        <p className="text-gray-600 text-sm mb-5">
                          Quantity: {order.itemcount || 1}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          Status:{" "}
                          <span className="font-bold">
                            {order.status || "Pending"}
                          </span>
                        </p>
                        <div className="p-3">
                          <select
                            className="bg-[#fafafa]"
                            value={order.status || "Pending"}
                            onChange={(e) =>
                              handleStatus(order.id, user.id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Order Confirmed">
                              Order Confirmed
                            </option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleRemove(order.id, user.id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Cancel the Order
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
}

export default ViewOrders;
