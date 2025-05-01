import React, { useEffect, useState } from "react";
import './App.css';
import Input from "./Components/Input";
import Output from "./Components/Output";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);        // Store user data
  const [search, setSearch] = useState("");    // Store search term
  const [loading, setLoading] = useState(true); // Track loading state
  const [sortOrder, setSortOrder] = useState("asc");  // Sorting state (A-Z or Z-A)

  // Fetch data on initial load
  useEffect(() => {
    axios.get("https://dummyjson.com/users")
      .then(res => {
        setData(res.data.users);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter users based on the search term
  const filteredUsers = search
    ? data.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
    : [] // If no search term, show all users

  // Sorting function
  const sortUsers = (users, sortOrder) => {
    return users.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);  // A-Z sorting
      } else {
        return nameB.localeCompare(nameA);  // Z-A sorting
      }
    });
  };

  // Apply sorting to filtered users
  const sortedUsers = sortUsers(filteredUsers, sortOrder);

  return (
    <>
      <Input setSearch={setSearch} />

      {/* Sorting dropdown */}
      <div className="flex justify-center mt-6">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>

      {/* Show loading or the filtered and sorted users */}
      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <Output users={sortedUsers} />
      )}
    </>
  );
}

export default App;
