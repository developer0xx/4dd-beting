import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, Image} from "react-native";
import styled from 'styled-components/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Images from '@/assets/Image';
import {Divider} from "@/components/BaseUtils";

const BettingRecord = (props: any) => {
    const [items, setItems] = useState([]);
    return <Container>
        <Title>Betting Record</Title>
        <Divider size={10}/>
        <Row>
            <HeaderText>Time</HeaderText>
            <HeaderText>P-Id</HeaderText>
            <HeaderText>Number</HeaderText>
            <HeaderText>$</HeaderText>
            <HeaderText>R</HeaderText>
        </Row>
        <ScrollView>
            {props.data.map((item, i) => (
                <Row key={`key_${i}`} offIf={i % 2 === 0}>
                    <HeaderText>{item.created_at.split(' ')[1]}</HeaderText>
                    <HeaderText>{item.user.username}</HeaderText>
                    <HeaderText>{item.bet_number}</HeaderText>
                    <HeaderText>{item.bet_amount}</HeaderText>
                        <HeaderText>{item.betting_status.description}</HeaderText>
                </Row>
            ))}
        </ScrollView>
    </Container>
};

const Container = styled(View)`
  width: 100%;
  align-self: center;
  background-color: #000;
  padding-vertical: 10px;
  padding-horizontal: 5px
  border-radius: 15px;
  flex: 1;
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
  width: 20%
  color: #fff;
  font-size: 12px;
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
