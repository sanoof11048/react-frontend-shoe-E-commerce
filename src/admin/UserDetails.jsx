import React, { useEffect, useState } from "react";
import axios from "axios";
import SideDash from "./SideDash";
import Swal from "sweetalert2";
import { Commet } from "react-loading-indicators";
import { motion } from "framer-motion";
import bgimg from "../assets/adminalert.webp"
import { useUser } from "../components/userContext";
import { useNavigate } from "react-router";


function UserDetails() {
  const {user}=useUser()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const users = response.data.filter((user) => user.id !== "1360");
        setUsers(users);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, [users]);

  const handleBlock = (userId) => {
    const status = "blocked";
    axios.patch(`http://localhost:3000/users/${userId}`, { status });
  };

  const handleUnblock = (userId) => {
    const status = "active";
    axios.patch(`http://localhost:3000/users/${userId}`, { status });
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/users/${userId}`)
          .then(() => {
            setUsers(users.filter((user) => user.id !== userId));
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          })
          .catch((err) => {
            setError("Error deleting user");
            Swal.fire(
              "Error!",
              "There was an issue deleting the user.",
              "error"
            );
          });
      } else {
        Swal.fire("Cancelled", "The user was not deleted.", "info");
      }
    });
  };

  const handleViewDetails = (user) => {
    const maskedPassword = "******";
    Swal.fire({
      title: `User Details - ${user.name}`,
      html: `
        <div class="text-sm text-gray-700">
          <p><strong>ID:</strong> ${user.id}</p>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Orders Count:</strong> ${user.orders.length}</p>
          <p><strong>Status:</strong> ${user.status}</p>
          <p><strong>Cart:</strong> ${user.cart.length} items</p>
          <p><strong>Password:</strong> ${maskedPassword}</p>
        </div>
      `,
      icon: "info",
      width: "500px",
      confirmButtonText: "Close",
      showCloseButton: true,
      padding: "10px",
      backdrop: true,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Commet color="gray" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

if(!user || user.id!=="1360"){
      return(
        <div className="flex justify-center  ">
          <img className="w-full h-full" src={bgimg}/>
          <button className="absolute top-10 text-gray-500" onClick={()=>navigate(-1)}>Go Back</button>
      </div>
      )
    }
  

  return (
    <motion.div
      className="min-h-screen bg-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-600 mx-auto px-auto text-white p-4">
          <SideDash />
        </div>

        <div className="flex-1 p-6 bg-gray-300">
          <h1 className="text-3xl font-bold mb-6 text-center">Users List</h1>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-600 text-white">
                <tr>
                  <th className="py-2 px-4 text-center ">Name</th>
                  <th className="py-2 px-4 text-center">Order Count</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.orders.length}</td>
                    <td className="py-2 px-4 flex justify-center gap-2">
                      {user.status === "active" && (
                        <button
                          onClick={() => handleBlock(user.id)}
                          className="bg-yellow-500 hover:text-gray-300 text-white py-1 px-3 rounded-md hover:bg-yellow-600 text-xs"
                        >
                          Block
                        </button>
                      )}
                      {user.status === "blocked" && (
                        <button
                          onClick={() => handleUnblock(user.id)}
                          className="bg-yellow-500 hover:text-gray-300 text-white py-1 px-3 rounded-md hover:bg-yellow-600 text-xs"
                        >
                          UnBlock
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="bg-blue-500 hover:text-gray-300 text-white py-1 px-3 rounded-md hover:bg-blue-600 text-xs"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:text-gray-300 text-white py-1 px-3 rounded-md hover:bg-red-600 text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UserDetails;