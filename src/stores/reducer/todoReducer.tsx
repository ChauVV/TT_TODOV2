import CONSTS from 'store/storeHelper/constants';

const initialState = {
  todos: [],
};

interface todoReducerProps {
  todos: any;
}

const todoReducer = (state = initialState, action: any): todoReducerProps => {
  const {payload, type} = action;

  switch (type) {
    case CONSTS.ADD_TODO_SUCCESS: {
      return {
        ...state,
        todos: payload,
      };
    }
    case CONSTS.EDIT_TODO_SUCCESS: {
      return {
        ...state,
        todos: payload,
      };
    }
    case CONSTS.DELETE_TODO_SUCCESS: {
      return {
        ...state,
        todos: payload,
      };
    }

    default:
      return state;
  }
};

export default todoReducer;
