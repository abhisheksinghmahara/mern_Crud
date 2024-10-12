import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../folderstore/actions/employeeActions'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; 
import AddEmployeeForm from './AddEmployeeForm';
import EditEmployeeForm from './EditEmployeeForm'; 
import { useNavigate } from 'react-router-dom'; 

const EmployeeData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const { employees = [], loading = false, error = null } = useSelector((state) => state.employees || {});

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteClick = (employeeId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(employeeId))
          .then(() => {
            Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'There was a problem deleting the employee.', 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The employee is safe :)', 'info');
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        navigate('/'); 
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'You are still logged in :)', 'info');
      }
    });
  };

  if (loading) return <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user ? user.firstName : 'Guest';

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    employee.post.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Employee List</h1>
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <span className="me-3" style={{ fontWeight: 'bold' }}>Welcome! <i style={{ color: "blue" }}>{userName}</i></span>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or position..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>Add New Employee</button>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.post}</td>
                <td>{employee.contactNumber}</td>
                <td>
                  <button 
                    className="btn btn-warning btn-sm me-2" 
                    onClick={() => handleEditClick(employee)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleDeleteClick(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {showAddModal && <AddEmployeeForm closeModal={() => setShowAddModal(false)} />}
      {showEditModal && <EditEmployeeForm closeModal={handleEditClose} employeeData={selectedEmployee} />}
    </div>
  );
};

export default EmployeeData;
