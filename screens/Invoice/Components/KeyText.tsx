import React from 'react';
import {View, Text} from "react-native";
import styled from 'styled-components/native';

const KeyText = (props: any) => {
  return <Container>
    <CustomText>{props.title} : {props.text}</CustomText>
  </Container>
};

const Container = styled(View)`
  flex: 1;
  flex-direction : row;
  margin-top: 6px
`;
const CustomText = styled(Text)`
  font-size: 20px
`;

export default KeyText;
