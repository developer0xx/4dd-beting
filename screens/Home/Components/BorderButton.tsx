import React from 'react';
import styled from 'styled-components/native';
import {View, Text, TouchableOpacity} from "react-native";

const BorderButton = (props: any) => {
  return (
    <Container {...props}>
      <ButtonText>{props.text}</ButtonText>
    </Container>
  )
};

const Container = styled(TouchableOpacity)`
  width: 110px;
  height: 40px;
  border-radius: 10px;
  border-width: 2px;
  border-color: rgba(255, 236, 70, 1);
  align-items: center;
  justify-content: center
`;

const ButtonText = styled(Text)`
  color: rgba(255, 236, 70, 1);
  font-size: 15px;
  font-weight: bold
`;
export default BorderButton;
