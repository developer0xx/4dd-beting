import React from 'react';
import {Animated, ScrollView, Text, View, Image} from "react-native";
import styled from 'styled-components/native';
import Images from '@/assets/Image';
import {Divider} from "@/components/BaseUtils";
import InvoiceDetails from '@/screens/Invoice/Components/InvoiceDetails';
import TicketView from '@/screens/Invoice/Components/TicketView';
import TotalView from '@/screens/Invoice/Components/TotalView';
import PlayerIdInput from '@/screens/Invoice/Components/PlayerIdInput';
import ColorButton from '@/components/ColorButton';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from '@react-navigation/native';

const Invoice = (props: any) => {
  const navigation = useNavigation();
  return(
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <StatusBar style={'dark'}/>
  <Container>
    <Header>
      <Logo source={Images.icon.logo}/>
      <TitleLogo source={Images.icon.invoice_logo}/>
    </Header>
    <Divider size={verticalScale(20)}/>
    <Body>
      <InvoiceDetails/>
      <Divider size={verticalScale(30)}/>
      <TicketView/>
      <Divider size={verticalScale(20)}/>
      <TotalView/>
      <Divider size={verticalScale(20)}/>
      <PlayerIdInput/>
    </Body>
    <Divider size={verticalScale(20)}/>
    <Bottom>
    <ColorButton bgColor={'rgba(221, 0, 19, 1)'} width={'40%'} onPress={() => navigation.goBack()} text={'Cancel'}/>
    <ColorButton bgColor={'rgba(0, 141, 40, 1)'} width={'40%'} onPress={() => navigation.navigate('Record')} text={'Confirm'}/>
    </Bottom>
  </Container>
    </SafeAreaView>)
};

const Container = styled(ScrollView)`
  flex: 1
`;
const Header = styled(View)`
  height: 60px;
  background-color: #000;
  justify-content: center
`;
const Logo = styled(Image)`
  width: 70px;
  height: 50px;
  resize-mode: contain;
  margin-left: 5%
`;
const TitleLogo = styled(Image)`
  position: absolute;
  right: 0;
  top: 0
  height: 65px;
  width: 70%
  resize-mode: cover;
`;
const Body = styled(View)`
  padding-horizontal: 5%
`;
const Bottom = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;

export default Invoice;
