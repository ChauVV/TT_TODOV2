import {put, takeLatest, fork, select} from 'redux-saga/effects';

import CONSTS from 'store/storeHelper/constants';

// Sort array object
const sortArray = (arr: object[]): object[] => {
  let temp = arr.sort((a, b) => {
    return b.priority - a.priority;
  });
  return temp;
};

interface addTodoProps {
  payload: object;
}

export function* addTodo({payload}: any) {
  const {data, onSuccess} = payload;
  try {
    console.log('addTODO: ', data, onSuccess);

    const todos = yield select(t => t.todoStore.todos);

    let temp = sortArray(todos);
    // sort
    temp = [data, ...todos];

    yield put({
      type: CONSTS.ADD_TODO_SUCCESS,
      payload: temp,
    });
    onSuccess(data, 0);
  } catch (err) {
    yield put({
      type: CONSTS.ADD_TODO_FAIL,
    });
  }
}

export function* editTodo({payload}: any) {
  const {data, onSuccess} = payload;
  try {
    const todos = yield select(t => t.todoStore.todos);
    let temp = [...todos];
    temp?.map(td => {
      if (data?.id === td.id) {
        td.title = data.title;
        td.priority = data.priority;
        td.to = data.to;
      }
    });
    // sort
    temp = sortArray(temp);

    yield put({
      type: CONSTS.EDIT_TODO_SUCCESS,
      payload: temp,
    });
    onSuccess(null, 0);
  } catch (err) {
    yield put({
      type: CONSTS.EDIT_TODO_FAIL,
    });
  }
}

export function* deleteTodo(obj: any) {
  const {payload = {}} = obj;
  try {
    const todos = yield select(t => t.todoStore.todos);
    let temp = [...todos];
    temp = todos.filter((td: any) => td.id !== payload.id);

    yield put({
      type: CONSTS.DELETE_TODO_SUCCESS,
      payload: temp,
    });
  } catch (err) {
    yield put({
      type: CONSTS.DELETE_TODO_FAIL,
    });
  }
}

function* watchProduct() {
  yield takeLatest(CONSTS.ADD_TODO, addTodo);
  yield takeLatest(CONSTS.EDIT_TODO, editTodo);
  yield takeLatest(CONSTS.DELETE_TODO, deleteTodo);
}

export default function* rootChild() {
  yield fork(watchProduct);
}
