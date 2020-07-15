import React from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Images from '@/assets/Image';
import {Divider} from "@/components/BaseUtils";
import ColorButton from '@/components/ColorButton';
import BettingRecord from '@/screens/Record/Components/BettingRecord';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from '@react-navigation/native';

const Record = (props: any) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <StatusBar style={'dark'}/>
      <Container>
        <Divider size={verticalScale(10)}/>
        <Date>17/06/2020 02:45 (GMT+8)</Date>
        <Divider size={20}/>
        <CreditView>
          <Title>Credit</Title>
          <CreditView style={{width: '25%'}}>
            <CustomText>0.00</CustomText>
            <TouchableOpacity><RefreshBtn source={Images.icon.refresh_icon}/></TouchableOpacity>
          </CreditView>
        </CreditView>
        <Divider size={20}/>
        <ColorButton bgColor={'rgba(13, 13, 13, 1)'} color={'rgba(255, 236, 76, 1)'} width={'100%'} text={'History'}/>
        <Divider size={10}/>
        <ColorButton bgColor={'rgba(13, 13, 13, 1)'} color={'rgba(255, 236, 76, 1)'} width={'100%'} onPress={() => navigation.navigate('Round')} text={'Payout'}/>
        <Divider size={10}/>
        <BettingRecord/>
        <Divider size={20}/>
      </Container>
    </SafeAreaView>)
};

const Container = styled(ScrollView)`
  flex: 1;
  background-color: rgba(50,50,50,1);
  padding-horizontal: 10%;
  padding-vertical: 10px
`;
const Date = styled(Text)`
  color: #fff;
  align-self: center;
  font-size: 16px
`;
const CreditView = styled(View)`
  flex-direction : row;
  justify-content: space-between;
  align-items: center;
  padding-right: 5px
`;
const Title = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold
`;
const CustomText = styled(Text)`
  color: #fff;
  font-size: 20px
`;
const RefreshBtn = styled(Image)`
  width: 20px;
  height: 20px;
  resize-mode: contain
`;

export default Record;
