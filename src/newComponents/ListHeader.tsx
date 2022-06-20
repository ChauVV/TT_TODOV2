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
import {StatusBar, FlatList, Alert} from 'react-native';
import styled from 'styled-components/native';
import {MotiView} from 'moti';

interface ListHeaderProps {
  showListHeader: boolean;
}

const ListHeader = ({showListHeader}: ListHeaderProps) => {
  return <Container />;
};

export default ListHeader;

const Container = styled(MotiView)`
  flex-direction: column;
  height: 299px;
  width: 100%;
  margin-top: 25px;
  border-radius: 15px;
  background-color: white;
`;
