import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, Image} from "react-native";
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Images from '@/assets/Image';
import {Divider} from "@/components/BaseUtils";

const BettingRecord = (props: any) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 10; i++) {
      temp.push(<Row key={`key_${i}`} offIf={i % 2 === 0} lastIf={i===9}>
        <HeaderText>{i+1}</HeaderText>
        <HeaderText>123</HeaderText>
        <HeaderText>-</HeaderText>
        <HeaderText>12</HeaderText>
      </Row>);
    }
    setItems(temp);
  }, []);
  return <Container>
    <Title>Betting Record</Title>
    <Divider size={10}/>
    <Row>
      <HeaderText>No</HeaderText>
      <HeaderText>Number</HeaderText>
      <HeaderText>B</HeaderText>
      <HeaderText>$</HeaderText>
    </Row>
    {items}
  </Container>
};

const Container = styled(View)`
  width: 100%;
  align-self: center;
  background-color: #000;
  padding-vertical: 10px;
  padding-horizontal: 5px
  border-radius: 15px;
`;
const Row = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${(props: any) => props.offIf ? 'rgba(60,60,60,1)' : 'rgba(40,40,40,1)'};
  padding-vertical: ${verticalScale(7)}px;
  border-bottom-left-radius: ${(props: any) => props.lastIf ? '10px' : '0'}
  border-bottom-right-radius: ${(props: any) => props.lastIf ? '10px' : '0'}
`;
const HeaderText = styled(Text)`
  width: 25%
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center
`;
const Title = styled(Text)`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  text-align: center
`;
export default BettingRecord;
