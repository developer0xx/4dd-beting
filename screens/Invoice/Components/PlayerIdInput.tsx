import React from 'react';
import {Text, View, Image, TextInput} from "react-native";
import styled from 'styled-components/native';

const PlayerIdInput = (props: any) => {
  return (
    <Container>
      <CustomText>Player ID :</CustomText>
      <InputBox value={props.playerId} onChangeText={(value) => props.handleChange(value)}/>
    </Container>
  )
};

const Container = styled(View)`
  flex-direction : row;
  justify-content: space-between
  align-items: center
`;
const CustomText = styled(Text)`
  font-size: 18px;
`;
const InputBox = styled(TextInput)`
  width: 50%;
  height: 35px
  border-width: 1px;
  border-color: rgba(200, 200, 200, 1);
  background-color: rgba(238,238,238,1)
  padding-horizontal: 5px;
`

export default PlayerIdInput;
