import React, {useState, useEffect} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const NumberCounter = (props: any) => {
  const interval = 12
  const [number, setNumber] = useState(0);
  const increaseNumber = () => {
    setNumber(number => number + interval);
  };
  const decreaseNumber = () => {
    if(number === 0) return;
    setNumber(number => number - 12);
  };
  return <Container {...props}>
    <BtnContainer onPress={increaseNumber}>
      <SymbolText>+</SymbolText>
    </BtnContainer>
    <NumberView>
      <CustomText>{number}</CustomText>
    </NumberView>
    <BtnContainer onPress={decreaseNumber}>
      <SymbolText>-</SymbolText>
    </BtnContainer>
  </Container>
};

const Container = styled(View)`
  height: ${verticalScale(33)}px;
  width: 80%
  background-color: #000;
  border-width: 0.5px;
  border-color: #fff;
  align-self: flex-end;
  flex-direction : row;
`;

const BtnContainer = styled(TouchableOpacity)`
  width: 25%;
  align-items: center;
  justify-content: center
`;
const CustomText = styled(Text)`
  color: #fff;
  font-size: 20px;
`;
const SymbolText = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
const NumberView = styled(View)`
  width: 50%;
  border-right-color: #fff;
  border-right-width: 0.5px;
  border-left-color: #fff;
  border-left-width: 0.5px;
  align-items: center;
  justify-content: center;
`;

export default NumberCounter
