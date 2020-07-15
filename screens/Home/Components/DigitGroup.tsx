import React from 'react';
import styled from 'styled-components/native';
import {View, Text} from "react-native";

const DigitGroup = (props: any) => {
  return (
    <Container>
      <DigitItem borderIf={true}><Digit>3</Digit></DigitItem>
      <DigitItem borderIf={true}><Digit>4</Digit></DigitItem>
      <DigitItem borderIf={true}><Digit>6</Digit></DigitItem>
      <DigitItem borderIf={false}><Digit>8</Digit></DigitItem>
    </Container>
  )
};

const Container = styled(View)`
  position: absolute;
  bottom: 70px
  width: 250px;
  height: 70px;
  background-color: rgba(143, 10, 17, 1)
  border-radius: 15px;
  border-width: 2px
  border-color: rgba(255, 236, 70, 1);
  flex-direction: row
`;

const DigitItem = styled(View)`
  width: 25%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-right-width: ${(props: any) => props.borderIf ? '2px' : 0}
  border-color: rgba(255, 236, 70, 1);
`;

const Digit = styled(Text)`
  color: rgba(255, 236, 70, 1);
  font-size: 25px;
  font-weight: bold
`;

export default DigitGroup;
