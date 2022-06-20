import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from 'store/reducer/todoReducer';

const todoPersistConfig = {
  key: 'todos',
  storage: storage,
};

const rootReducer = combineReducers({
  todoStore: persistReducer(todoPersistConfig, todoReducer),
});

export default rootReducer;
