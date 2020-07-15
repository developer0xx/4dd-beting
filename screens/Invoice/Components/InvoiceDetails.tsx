import React from 'react';
import {Text, View} from "react-native";
import styled from 'styled-components/native';
import KeyText from '@/screens/Invoice/Components/KeyText';

const InvoiceDetails = (props:any) => {
  return <Container>
    <Title>Dwyane Clark</Title>
    <Title>Invoice #122333</Title>
    <KeyText title='Round' text='25'/>
    <KeyText title='Date' text='29/06/2020'/>
    <KeyText title='Time' text='15:32:00'/>
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
