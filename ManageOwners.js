import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar'; // ✅ Make sure this file exists
import ownerBg from '../assets/ownerbg.jpg';
const ManageOwners = () => {
  const [owners, setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/admin/owners", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOwners(res.data);
    } catch (err) {
      alert("Failed to fetch owners.");
    }
  };

  const deleteOwner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this owner?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOwners(); // Refresh list
    } catch (err) {
      alert("Failed to delete owner.");
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <div>
      <AdminNavbar /> {/* ✅ Reusable navbar at top */}
       <div
    style={{
      backgroundImage:  `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url(${ownerBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
      
      <div style={styles.container}>
        <h3 style={styles.title}>All Restaurant Owners</h3>
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
            {owners.length > 0 ? (
              owners.map((o) => (
                <tr key={o.userId}>
                  <td style={styles.td}>{o.userId}</td>
                  <td style={styles.td}>{o.name}</td>
                  <td style={styles.td}>{o.email}</td>
                  <td style={styles.td}>{o.phoneNumber}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteOwner(o.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="5">
                  No owners found.
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
    margin: '0 auto'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '30px'
  },
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
    fontWeight: 'bold'
  }
};

export default ManageOwners;
