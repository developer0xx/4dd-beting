import React from 'react';
import {Text, View, Image} from "react-native";
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const TotalView = (props: any) => {
  return <Container>
    <ButtonView>
      <CustomText>Total : {props.total}</CustomText>
    </ButtonView>
  </Container>
};

const Container = styled(View)`
  flex-direction: row;
  justify-content: flex-end
`;
const ButtonView = styled(View)`
  height: ${verticalScale(30)}
  width: ${scale(120)}
  background-color: rgba(201, 9, 16, 1);
  align-items: center;
  justify-content: center
`;
const CustomText = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold
`;

export default TotalView;
