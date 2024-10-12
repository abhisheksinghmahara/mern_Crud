import { 
  ADD_EMPLOYEE, 
  GET_EMPLOYEES, 
  UPDATE_EMPLOYEE, 
  DELETE_EMPLOYEE, 
  SET_LOADING, 
  SET_ERROR 
} from '../actions/employeeActions';

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee._id === action.payload._id ? action.payload : employee
        ), 
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((employee) => employee._id !== action.payload),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
