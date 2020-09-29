import React, {useEffect, useState} from 'react';
import {Text, View, Image, TextInput, Alert} from "react-native";
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Images from '@/assets/Image';
import NumberCounter from '@/screens/Round/Components/NumberCounter';
import {Divider} from "@/components/BaseUtils";

const TicketTable = (props: any) => {

  console.log(props.items);

  return <Container>
    <Row>
      <HeaderText>No</HeaderText>
      <HeaderText>Number</HeaderText>
      <HeaderText>$</HeaderText>
    </Row>
    <Divider size={verticalScale(10)}/>
    <View>
      {props.items.map((item, i) => (<ItemRow oddIf={i % 2 === 0} key={i} lastIf={i === 9}>
        <SubItemRow>
          <Number width={'30%'} >{i+1}</Number>
          <CustomImage source={Images.icon.double_arrow}/>
          <View style={{width: '20%'}}/>
        </SubItemRow>
        <NumberInput style={{width: '25%'}} onChangeText={(value) => props.handleChange(value, i)} value={item.num} keyboardType={'numeric'} maxLength={4}/>
        <View style={{width: '33%'}}>
          <NumberCounter setIncrease={(count) => props.onPressSetIncrease(count, i)} number={item.count}/>
        </View>
      </ItemRow>))}
    </View>
  </Container>
};

const Container = styled(View)`
  width: 95%;
  align-self: center;
  background-color: #000;
  padding-vertical: 10px;
  padding-horizontal: 5px
  border-radius: 15px;
`;
const Row = styled(View)`
  flex-direction: row;
  align-items : center;
  justify-content: space-around
`;
const HeaderText = styled(Text)`
  width: 33%
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center
`;
const CustomImage = styled(Image)`
  width: 30px;
  height: 30px;
  resize-mode: contain
`;
const ItemRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props: any) => props.oddIf ? 'rgba(60,60,60,1)' : 'rgba(40,40,40,1)'}
  padding-vertical: ${verticalScale(7)}px;
  border-bottom-left-radius: ${(props:any) => props.lastIf ? '10px' : '0'}
  border-bottom-right-radius: ${(props:any) => props.lastIf ? '10px' : '0'}
`;
const Number = styled(Text)`
  font-size: 22px;
  color: white;
  width: ${(props: any) => props.width}
  text-align: center;
`;
const NumberInput = styled(TextInput)`
  height: ${verticalScale(33)}px
  background-color: #000;
  color: #fff;
  padding-horizontal: 5px;
  border-width: 0.5px;
  border-color: #fff;
  font-size: 20px;
  text-align : center;
`;
const SubItemRow = styled(Row)`
  width: 30%;
  border-right-width: 0px;
  border-right-color: white
`;
export default TicketTable;
