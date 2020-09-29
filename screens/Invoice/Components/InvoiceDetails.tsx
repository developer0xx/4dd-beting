import React from 'react';
import {Text, View} from "react-native";
import styled from 'styled-components/native';
import KeyText from '@/screens/Invoice/Components/KeyText';

const InvoiceDetails = (props:any) => {
  return <Container>
    <Title>{props.name}</Title>
    <Title>Invoice #{props.invoicenumber}</Title>
    <KeyText title='Round' text={props.round}/>
    <KeyText title='Date' text={props.date}/>
    <KeyText title='Time' text={props.time}/>
  </Container>
};

const Container = styled(View)`
  flex: 1;
`;
const Title = styled(Text)`
  font-size: 20px;
  margin-top: 6px
`;
export default InvoiceDetails;
