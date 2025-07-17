import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar'; 
import ownerBg from '../assets/ownerbg.jpg';
const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users. Please check your network or token.");
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); 
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 14px rgba(0,0,0,0.15)',
    borderRadius: '10px',
    overflow: 'hidden', 
    backgroundColor: '#ffffffcc', 
  },
  th: {
    backgroundColor: '#77afb1ff',
    color: 'white',
    padding: '14px',
    fontSize: '16px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  },
  td: {
    padding: '12px 14px',
    fontSize: '15px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#dae6e5ff',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

  return (
    
    <div>
      <div
    style={{
      backgroundImage:  `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${ownerBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
      <AdminNavbar />

      <div style={styles.container}>
        <h3 style={styles.title}>All Registered Users</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u.userId}>
                  <td style={styles.td}>{u.userId}</td>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{u.phoneNumber}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete user "${u.name}"?`
                          )
                        ) {
                          deleteUser(u.userId);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="5">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    textAlign: 'left',
    border: '1px solid #dee2e6',
  },
  td: {
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #dee2e6',
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ManageUsers;
