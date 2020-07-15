import React from 'react';
import {ScrollView, Text, View, Image} from "react-native";
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import TicketTable from '@/screens/Round/Components/TicketTable';
import ColorButton from '@/components/ColorButton';
import {Divider} from "@/components/BaseUtils";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from '@react-navigation/native';

const Round = (props: any) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <StatusBar style={'dark'}/>
    <Container>
    <Header>
      <Title>Round 2</Title>
    </Header>
    <TicketTable/>
    <Divider size={verticalScale(15)}/>
    <Bottom>
      <ColorButton key={'key_1'} bgColor={'rgba(0, 141, 40, 1)'} width={'40%'} height={`${verticalScale(42)}px`} text={'Submit'} onPress={() => navigation.navigate('Invoice')}/>
      <ColorButton key={'key_2'} bgColor={'rgba(221, 0, 19, 1)'} width={'40%'} height={`${verticalScale(42)}px`} text={'Cancel'} onPress={() => navigation.goBack()}/>
    </Bottom>
  </Container>
    </SafeAreaView>)
};

const Container = styled(ScrollView)`
  flex: 1;
  background-color: rgba(50,50,50,1);
  padding-horizontal: 3%
`;
const Header = styled(View)`
  align-items: center;
  padding-vertical: ${verticalScale(10)}px
`;
const Title = styled(Text)`
  color: white;
  font-size: 28px;
  font-weight: bold
`;
const Bottom = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;
export default Round;
