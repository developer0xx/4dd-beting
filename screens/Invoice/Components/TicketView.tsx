import React from 'react';
import styled from 'styled-components/native';
import {View, Text} from "react-native";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const TicketView = (props:any) => {
  return <Container>
    <Header>
      <TitleText>Ticket</TitleText>
      <TitleText>Amount</TitleText>
    </Header>
    {props.data.map((item) => {
      return <RowItem>
        <ItemText>{item.num}</ItemText>
        <ItemText>{item.count}</ItemText>
      </RowItem>
    })}
  </Container>
};

const Container = styled(View)`
  flex: 1;
  border-color: #000;
  border-width: 0.5px
`;
const Header = styled(View)`
  height: ${verticalScale(30)}
  flex-direction: row;
  background-color: rgba(238, 238, 238, 1)
  align-items: center
`;
const TitleText = styled(Text)`
  width: 50%
  font-weight: bold;
  text-align: center;
  font-size: 16px
`;
const RowItem = styled(View)`
  height: ${verticalScale(35)}
  flex-direction: row;
  align-items: center
`;
const ItemText = styled(Text)`
  width: 50%
  text-align: center;
  font-size: 16px
`;

export default TicketView;
