import React from 'react';
import styled from 'styled-components/native';
import {View, Text, FlatList} from "react-native";

const NumberPanel = (props:any) => {
  return (
    <Container {...props}>
      <Title {...props}>{props.title}</Title>
      <CustomText>{props.date}</CustomText>
      <DividerLine {...props}/>
      <NumberViewContainer>
      <ColView>
        <FlatList
          data={['Time', ...props.data.time]}
          keyExtractor={(item, index) => `number_${index}`}
          renderItem={({item}) => {
            return <CustomText>{item}</CustomText>
          }}/>
      </ColView>
      <ColView>
        <FlatList
          data={['Number', ...props.data.number]}
          keyExtractor={(item, index) => `number_${index}`}
          renderItem={({item}) => {
            return <CustomText>{item}</CustomText>
          }}/>
      </ColView>
      </NumberViewContainer>
    </Container>
  )
};

const Container = styled(View)`
  width: ${(props: any) => props.width ? props.width : '45%'};
  padding-bottom: 10px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props:any) => props.baseColor}
  align-items: center;
  margin-horizontal: 5px 
`;
const Title = styled(Text)`
  margin-top: 10px
  color: ${(props:any) => props.baseColor};
  font-size: 16px;
  font-weight: bold
`;
const CustomText = styled(Text)`
  margin-top: 5px;
  color: white;;
  text-align: center
`;
const DividerLine = styled(View)`
  border-width: 2px;
  border-top-color: ${(props:any) => props.baseColor};
  height: 10px;
  width: 20%;
  margin-top: 10px
`;
const ColView = styled(View)`
  width: 45%;
  align-items: center
`;
const NumberViewContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between
`;
export default NumberPanel;

