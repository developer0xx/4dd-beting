import React, {useEffect, useState} from 'react';
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
import {Config} from "../../constants/Config";
import axios from 'axios';
import {getDate, getTime} from "../../utils/getDate";

const Record = (props: any) => {
    const navigation = useNavigation();
    const [recorddata, setRecordData] = useState([]);
    const date = getDate();
    const time = getTime();
    useEffect(() => {

        const fetch = async () => {
            const res = await axios(Config.api_url + 'getBettingRecord');
            console.log(res.data);
            setRecordData(res.data);
        }
        fetch();

    }, []);
    return (
        <SafeAreaView style={{flex: 1}} edges={['top']}>
            <StatusBar style={'dark'}/>
            <Container>
                <Divider size={verticalScale(10)}/>
                <Date>{date} {time}</Date>
                <Divider size={20}/>
                <CreditView>
                    <Title>Credit</Title>
                    <CreditView style={{width: '25%'}}>
                        <CustomText>0.00</CustomText>
                        <TouchableOpacity><RefreshBtn source={Images.icon.refresh_icon}/></TouchableOpacity>
                    </CreditView>
                </CreditView>
                <Divider size={20}/>
                <ColorButton bgColor={'rgba(13, 13, 13, 1)'} color={'rgba(255, 236, 76, 1)'} width={'100%'}
                             text={'History'}/>
                <Divider size={10}/>
                <ColorButton bgColor={'rgba(13, 13, 13, 1)'} color={'rgba(255, 236, 76, 1)'} width={'100%'}
                             onPress={() => navigation.navigate('Round')} text={'Payout'}/>
                <Divider size={10}/>
                <BettingRecord data={recorddata}/>

                <Divider size={20}/>
            </Container>
        </SafeAreaView>)
};

const Container = styled(View)`
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
