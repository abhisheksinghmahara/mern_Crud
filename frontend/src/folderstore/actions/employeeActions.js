import axios from 'axios';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export const addEmployee = (employee) => ({
  type: ADD_EMPLOYEE,
  payload: employee,
});

export const getEmployees = (employees) => ({
  type: GET_EMPLOYEES,
  payload: employees,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const fetchEmployees = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const response = await axios.get('http://localhost:4800/employeeDetails', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(getEmployees(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    await axios.delete(`http://localhost:4800/employeeDetails/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: DELETE_EMPLOYEE, payload: employeeId });
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    throw error;
  }
};

export const createEmployee = (employeeData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const response = await axios.post('http://localhost:4800/employeeDetails', employeeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch(addEmployee(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateEmployee = (employeeId, updatedData) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    const response = await axios.put(`http://localhost:4800/employeeDetails/${employeeId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    dispatch({ type: UPDATE_EMPLOYEE, payload: response.data });
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};
