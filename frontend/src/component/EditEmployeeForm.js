import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../folderstore/actions/employeeActions';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditEmployeeForm = ({ closeModal, employeeData }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(employeeData.name);
  const [email, setEmail] = useState(employeeData.email);
  const [post, setPost] = useState(employeeData.post);
  const [contactNumber, setContactNumber] = useState(employeeData.contactNumber);

  useEffect(() => {
    setName(employeeData.name);
    setEmail(employeeData.email);
    setPost(employeeData.post);
    setContactNumber(employeeData.contactNumber);
  }, [employeeData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployee(employeeData._id, { name, email, post, contactNumber }));
    Swal.fire({
      icon: 'success',
      title: 'Employee Updated',
      text: 'Employee details have been successfully updated!',
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
            <h5 className="modal-title">Edit Employee</h5>
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
              <button type="submit" className="btn btn-primary">Update Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
