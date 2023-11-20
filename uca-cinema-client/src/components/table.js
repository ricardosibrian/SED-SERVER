import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomButton from '../components/button';
import './DataTable.css'; // Agregamos un archivo de estilos (DataTable.css)
import DeleteDialog from '../deleteUser';
import RolDialog from '../updateRol';

const DataTable = () => {
  const [apiData, setApiData] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [userRole, setUserRole] = useState('');

  const authToken = localStorage.getItem("authToken");
 

  const fetchUserRole = async () => {
    try {
      const response = await axios.get('/api/auth/whoami', {
        headers: {
          authorization: `Bearer ${authToken}`
        }
      });
      setUserRole(response.data.rol);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const fetchData = async () => {
    try {
      // Condiciona la solicitud en función del rol
      const route = userRole === 'admin' ? 'some' : '';
      const response = await axios.get(`/api/user/${route}`, {
        headers: {
          authorization: `Bearer ${authToken}`
        }
      });
      setApiData(response.data.users);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchData();
  }, [userRole]);

  const handleCellClick = (params) => {
    setSelectedRowId(params.id);
  };

  const handleEditClick = () => {
    if (selectedRowId !== null) {
      window.alert(`Editar ID: ${selectedRowId}`);
    } else {
      window.alert('Seleccione una fila para editar.');
    }
  };

  const handleDeleteClick = () => {
    if (selectedRowId !== null) {
      window.alert(`Eliminar ID: ${selectedRowId}`);
    } else {
      window.alert('Seleccione una fila para eliminar.');
    }
  };

  return (
    <div>
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <RolDialog id={selectedRowId} fetchData={fetchData}/>
        <DeleteDialog id={selectedRowId} fetchData={fetchData} />
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleCellClick(row)}
              className={selectedRowId === row.id ? 'selected-row' : ''}
            >
              <td>{row.id}</td>
              <td>{row.username}</td>
              <td>{row.email}</td>
              <td>{row.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default DataTable;





