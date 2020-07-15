import React from 'react';
import styled from 'styled-components/native';
import {View, Text, TouchableOpacity} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const ColorButton = (props: any) => {
  return <Container {...props}>
    <ButtonText {...props}>{props.text}</ButtonText>
  </Container>
};
export const GradientButton = (props: any) => {
  return <Container {...props} onPress={() => props.onPress}>
    <GradientBackground
      colors={props.colors}>
      <ButtonText {...props}>{props.text}</ButtonText>
    </GradientBackground>
  </Container>
};

const Container = styled(TouchableOpacity)`
  width : ${(props:any) => props.width};
  height: ${(props: any) => props.height ? props.height : '45px'};
  border-radius: 10px;
  background-color: ${(props:any) => props.bgColor};
  justify-content : center;
  align-items: center;
  border-color: ${(props: any) => props.color ? props.color : '#fff'};
  border-width: ${(props: any) => props.borderWidth ? props.borderWidth : '2px'};
`;
const ButtonText = styled(Text)`
  color: ${(props: any) => props.color ? props.color : '#fff'}
  font-size: ${(props: any) => props.fontSize ? props.fontSize : '22px'};
  font-weight: bold
`;
const GradientBackground = styled(LinearGradient)`
  align-items: center;
  justify-content: center
  border-radius: 5;
  width: 100%;
  height: 100%;
`;
export default ColorButton
