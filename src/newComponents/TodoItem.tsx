/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {MotiView, useAnimationState} from 'moti';
import moment from 'moment';
import {Icon} from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalPriority from 'newComponent/ModalPriority';

enum PRIORITIES {
  HIGHT = 3,
  MEDIUM = 2,
  LOW = 1,
}

const timeAgo = (timeStamp: string): string => {
  let a = moment(moment.unix(Number(timeStamp)));
  let b = moment();

  const r = a.diff(b, 'days');
  if (r > 0) {
    return `Còn ${r} ngày`;
  } else if (r < 0) {
    return `Đã qua ${Math.abs(r)} ngày`;
  }
  return 'Hôm nay';
};

interface TodoItemProps {
  selected: any;
  item: any;
  index: number;
  openEdit: Function;
  submitEdit: Function;
  onDelete: Function;
}

const TodoItem = ({
  selected,
  item,
  index,
  openEdit,
  submitEdit,
  onDelete,
}: TodoItemProps) => {
  if (selected?.id === item.id) {
    console.log('item: ', item);
  }
  const [expend, setExpend] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(PRIORITIES.HIGHT);
  const [to, setTo] = useState(
    moment(moment().add(1, 'day')).unix().toString(),
  );

  const [isPickTo, setPickTo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selected && selected.id === item.id) {
      contentAnimate.transitionTo('expand');
      setExpend(true);
    } else {
      contentAnimate.transitionTo('collapse');
      setExpend(false);
    }
    setTitle(item.title);
    setPriority(item.priority);
    setTo(item.to);
  }, [selected]);

  const contentAnimate = useAnimationState({
    expand: {
      height: 299,
    },
    collapse: {
      height: 114,
    },
  });

  const _submitEdit = () => {
    const data = {
      id: item.id,
      title: title,
      priority: priority,
      to: to,
    };
    submitEdit(data, index);
  };

  return (
    <Container
      from={{height: 114}}
      state={contentAnimate}
      transition={{type: 'timing', duration: 300}}>
      <ItemHeaderView>
        {!expend ? (
          <>
            <StatusView priority={priority} />
            <Title lineNumber={2}>{item?.title}</Title>
          </>
        ) : (
          <HExpendView />
        )}
        <BtnExpend
          onPress={() => {
            selected?.id === item.id
              ? onDelete()
              : openEdit(selected?.id === item.id ? null : item, index);
          }}>
          {expend ? (
            <>
              <Icon
                name={'trash-outline'}
                size={18}
                color={'black'}
                type={'ionicon'}
              />
              <IconText>Xóa</IconText>
            </>
          ) : (
            <>
              <Icon
                name={'create-outline'}
                size={18}
                color={'black'}
                type={'ionicon'}
              />
            </>
          )}
        </BtnExpend>
      </ItemHeaderView>
      {expend ? (
        <EditView>
          <RowContainer disabled={true}>
            <Input
              value={title}
              onChangeText={setTitle}
              placeholder="Enter new task"
            />
          </RowContainer>
          <RowContainer activeOpacity={1} onPress={() => setPickTo(true)}>
            <RowTitle>Thời hạn</RowTitle>
            <RowValue>{moment.unix(Number(to)).format('DD/MM/YYYY')}</RowValue>
          </RowContainer>
          <RowContainer activeOpacity={1} onPress={() => setModalVisible(true)}>
            <RowTitle>Mức độ ưu tiên</RowTitle>
            <RowValue>
              {priority === PRIORITIES.HIGHT
                ? 'Cao'
                : priority === PRIORITIES.MEDIUM
                ? 'Trung bình'
                : 'Thấp'}
            </RowValue>
          </RowContainer>
          <BtnDone disabled={title.length === 0} onPress={_submitEdit}>
            <BtnDoneText>Xong</BtnDoneText>
          </BtnDone>
        </EditView>
      ) : (
        <NomalView>
          <NormalContent>
            <Npriority priority={priority}>
              {`Ưu tiên ${
                priority === PRIORITIES.HIGHT
                  ? 'cao'
                  : priority === PRIORITIES.MEDIUM
                  ? 'trung bình'
                  : 'thấp'
              }`}
            </Npriority>
            <Nduration>{timeAgo(to)}</Nduration>
          </NormalContent>
        </NomalView>
      )}
      <DateTimePickerModal
        isVisible={isPickTo}
        mode="date"
        onConfirm={pr => {
          setPickTo(false);
          setTo(moment(moment(pr)).unix().toString());
        }}
        onCancel={() => {
          setPickTo(false);
        }}
      />
      <ModalPriority
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setPriority={(p: any) => {
          setPriority(p);
        }}
      />
    </Container>
  );
};

export default TodoItem;

const Nduration = styled.Text`
  font-size: 10px;
  color: black;
`;
const Npriority = styled.Text`
color: ${({priority}: any) => {
  return priority === PRIORITIES.HIGHT
    ? '#21AB3B'
    : priority === PRIORITIES.MEDIUM
    ? '#F2994A'
    : 'gray';
}}
  font-size: 12px;
`;
const NormalContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 32px;
  margin-top: 20px;
`;
const BtnDoneText = styled.Text`
  font-size: 12px;
  color: white;
`;
const BtnDone = styled.TouchableOpacity`
  align-self: center;
  height: 28px;
  width: 85px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  margin-top: 26px;
  opacity: ${({disabled}: any) => (disabled ? 0.5 : 1)};
  background-color: #21ab3b;
`;
const RowValue = styled.Text`
  font-size: 14px;
  color: black;
`;
const RowTitle = styled.Text`
  font-size: 16px;
  color: black;
`;
const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: lightgray;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const Input = styled.TextInput`
  font-size: 16px;
  color: black;
  padding-bottom: 5px;
`;
const IconText = styled.Text`
  font-size: 12px;
  color: black;
`;
const HExpendView = styled.View`
  flex: 1;
`;
const StatusView = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background-color: ${({priority}: any) => {
    return priority === PRIORITIES.HIGHT
      ? '#21AB3B'
      : priority === PRIORITIES.MEDIUM
      ? '#F2994A'
      : 'gray';
  }};
`;
const ItemHeaderView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const NomalView = styled.View`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const EditView = styled.View`
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const BtnExpend = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Title = styled.Text`
  flex: 1;
  padding-horizontal: 10px;
  margin-bottom: 2px;
`;
const Container = styled(MotiView)`
  flex-direction: column;
  height: 114px;
  width: 100%;
  margin-top: 25px;
  border-radius: 15px;
  background-color: white;

  padding-horizontal: 18px;
  padding-vertical: 24px;
`;
