import React from 'react';
import {View, Text, Dimensions, Platform, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const isIOS = Platform.OS === 'ios';
const {height, width} = Dimensions.get('window');
const ratio = height/width;

const Tabbar = (props: any) => {
  const navigation = useNavigation();
  return (
    <Container>
      <Item><TabBarIcon name="ios-home" color={'white'} /></Item>
      <Item><TabBarIcon name="md-grid" color={'white'} /></Item>
      <Item><TabBarIcon name="md-albums" color={'white'} /></Item>
      <Item><TabBarIcon name="md-settings" color={'white'} /></Item>
    </Container>
  )
};

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const Container = styled(View)`
  width: 100%;
  height: ${ratio < 1.5 ? '130px' : '90px'};
  flex-direction: row;
  justify-content: center;
  background-color: #0C0C0C;
`;

const Item = styled(TouchableOpacity)`
  width: 25%;
  justify-content: center
  align-items: center;
  border-left-width: 1px;
  border-left-color: rgba(46,46,46,1);
  border-right-width: 1px;
  border-right-color: rgba(46,46,46,1);
`;

export default Tabbar;
