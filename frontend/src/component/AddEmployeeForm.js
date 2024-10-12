import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../folderstore/actions/employeeActions';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddEmployeeForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [post, setPost] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployee({ name, email, post, contactNumber }));
    setName('');
    setEmail('');
    setPost('');
    setContactNumber('');
    Swal.fire({
      icon: 'success',
      title: 'Employee Added',
      text: 'New employee has been successfully added!',
      confirmButtonText: 'OK'
    }).then(() => {
      closeModal();
    });
  };

  return (
    <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Employee</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  className="form-control"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
