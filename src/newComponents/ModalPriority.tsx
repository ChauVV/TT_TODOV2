import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';

enum PRIORITIES {
  HIGHT = 3,
  MEDIUM = 2,
  LOW = 1,
}

interface ModalAddProps {
  modalVisible: boolean;
  setModalVisible: Function;
  setPriority: Function;
}

const ModalAdd = ({
  modalVisible,
  setModalVisible,
  setPriority,
}: ModalAddProps) => {
  const _selected = (p: any) => {
    setModalVisible(false);
    setPriority(p);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <Container delay={200} visible={modalVisible} activeOpacity={1}>
        <DismissView onPress={() => setModalVisible(false)} />
        <Content>
          <HeaderView>
            <Header>Priority</Header>
          </HeaderView>
          <TextAdd onPress={() => _selected(PRIORITIES.HIGHT)} color="#21AB3B">
            Cao
          </TextAdd>
          <Line />
          <TextAdd onPress={() => _selected(PRIORITIES.MEDIUM)} color="#F2994A">
            Trung bình
          </TextAdd>
          <Line />
          <TextAdd onPress={() => _selected(PRIORITIES.LOW)} color="gray">
            Thấp
          </TextAdd>
        </Content>
      </Container>
    </Modal>
  );
};

export default ModalAdd;

const Line = styled.View`
  margin-horizontal: 5%;
  border-bottom-width: 1px;
  border-color: lightgray;
`;
const Header = styled.Text`
  font-size: 16px;
  color: black;
`;
const HeaderView = styled.View`
  height: 40px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: lightgray;
`;
const TextAdd = styled.Text`
  font-size: 15px;
  color: ${({color}: any) => color};
  font-weight: bold;
  margin-horizontal: 5%;
  flex: 1;
  text-align: center;
  text-align-vertical: center;
`;
const DismissView = styled.TouchableOpacity`
  flex: 1;
`;
const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  background-color: 'rgba(0,0,0,0.3)';
`;
const Content = styled.View`
  height: 30%;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  flex-direction: column;
  padding-bottom: 20px;
`;
