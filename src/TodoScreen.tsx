/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect, useRef} from 'react';
import {StatusBar, FlatList, Alert} from 'react-native';
import styled from 'styled-components/native';
import {connect} from 'react-redux';
import REDUX_CONSTS from 'store/storeHelper/constants';
import moment from 'moment';

import TodoItem from 'newComponent/TodoItem';

enum PRIORITIES {
  HIGHT = 3,
  MEDIUM = 2,
  LOW = 1,
}

interface MainScreenProps {
  todos: any;
  addTodo: Function;
  editTodo: Function;
  deleteTodo: Function;
}

const TodoScreen = ({
  todos,
  addTodo,
  editTodo,
  deleteTodo,
}: MainScreenProps) => {
  const [selected, setSelected] = useState<any>(null);
  const refList = useRef(null);

  const clickDelete = () => {
    Alert.alert('Warning', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const _td = {...selected};

          deleteTodo(_td);

          setSelected(null);
        },
      },
    ]);
  };

  const _editTOdo = (td: any, _: number) => {
    const payload = {
      data: td,
      onSuccess: initNewTaskSuccess,
    };

    editTodo(payload);
  };

  const _openEditItem = (td: any, index: number) => {
    setSelected(td);
    if (td) {
      setTimeout(() => {
        refList?.current?.scrollToIndex({
          animated: true,
          index: index,
        });
      }, 850);
    }
  };

  const initNewTaskSuccess = (td: any, index: number) => {
    console.log('initSuccess', td, index);
    _openEditItem(td, index);
  };

  const initNewTask = () => {
    const newT = {
      id: new Date().getTime().toString(),
      title: 'new task',
      priority: PRIORITIES.HIGHT,
      to: moment(moment().add(1, 'day')).unix().toString(),
    };
    const payload = {
      data: newT,
      onSuccess: initNewTaskSuccess,
    };

    addTodo(payload);
  };

  return (
    <SafeAreaViewS>
      <StatusBar barStyle={'light-content'} backgroundColor={'#f7cc15'} />
      <Container>
        <Title>To-do list</Title>
        <ListTaskContainer>
          <FlatListS
            ref={refList}
            data={todos}
            keyExtractor={(item: any) => item?.id?.toString()}
            renderItem={({item, index}: any) => (
              <TodoItem
                item={item}
                index={index}
                selected={selected}
                setSelected={setSelected}
                openEdit={_openEditItem}
                submitEdit={_editTOdo}
                onDelete={clickDelete}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyListContainer>
                <EL_Text>Let's create new to-do!</EL_Text>
              </EmptyListContainer>
            )}
          />
        </ListTaskContainer>
        <BtnCreateContainer>
          <BtnCreate onPress={initNewTask}>
            <TextCreate>Tạo task mới +</TextCreate>
          </BtnCreate>
        </BtnCreateContainer>
      </Container>
    </SafeAreaViewS>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todos: state.todoStore.todos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: (payload: any) =>
      dispatch({
        type: REDUX_CONSTS.ADD_TODO,
        payload,
      }),
    editTodo: (payload: any) =>
      dispatch({
        type: REDUX_CONSTS.EDIT_TODO,
        payload,
      }),
    deleteTodo: (payload: any) =>
      dispatch({
        type: REDUX_CONSTS.DELETE_TODO,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen);

const EL_Text = styled.Text`
  margin-top: 100px;
  font-size: 12px;
  color: white;
  text-align: center;
`;
const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TextCreate = styled.Text`
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-align: center;
`;
const BtnCreate = styled.TouchableOpacity`
  height: 44px;
  margin-horizontal: 20px;
  border-radius: 22px;
  background-color: #f65d79;
  justify-content: center;
  align-items: center;
`;
const BtnCreateContainer = styled.View`
  width: 100%;
  justify-content: center;
  padding-vertical: 24px;
`;
const FlatListS = styled.FlatList`
  padding-horizontal: 24px;
`;
const ListTaskContainer = styled.View`
  flex: 1;
  margin-top: 10px;
`;
const Title = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f7cc15;
`;
const SafeAreaViewS = styled.SafeAreaView`
  flex: 1;
  background-color: #f7cc15;
`;
