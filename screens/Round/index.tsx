import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, Image, Alert} from "react-native";
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import TicketTable from '@/screens/Round/Components/TicketTable';
import ColorButton from '@/components/ColorButton';
import {Divider} from "@/components/BaseUtils";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from '@react-navigation/native';
import { Config} from "../../constants/Config";
import axios from 'axios';
import {getDate, getTime} from "../../utils/getDate";

const Round = (props: any) => {
  const navigation = useNavigation();
  const[round, setRound] = useState(0);
  const[startTime, setStartTime] = useState('');
  const[endTime, setEndTime] = useState('');
  const[availableBetting, setAvailableBetting] = useState(false);
  const [items, setItems] = useState([
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
    {num: null, count: null},
  ]);
  const handleChange = (e, i) => {
    const data = [...items];
    data[i].num = e;
    setItems(data);
  };

  const onPressSetIncrease = (count: any, i: number) => {
    const data = [...items];
    data[i].count = count;
    setItems(data);
  };

  const getDifferenceTime = (round_startTime: string, round_endTime: string) => {
    let currentTime = new Date().getTime();
    let roundStartTime = new Date(getDate() + " " + round_startTime).getTime();
    let roundEndTime = new Date(getDate() + " " + round_endTime).getTime();
    console.log(currentTime, roundStartTime, roundEndTime);
    if (roundStartTime < currentTime && roundEndTime > currentTime) {
      return true;
    }
    else {
      return false;
    }

  };


  useEffect(() => {
    const fetch = async () => {
      const res = await axios(Config.api_url + 'getRound');
      let avaiable_round = 0;let start_time = ''; let end_time = '';
      res.data.forEach(function (item) {
        console.log(item.start_time, item.end_time);
        if(getDifferenceTime(item.start_time, item.end_time)) {
          console.log("this is available status");
          if(item.striker_number == 0) {
            avaiable_round = item.id ;
            start_time = item.start_time;
            end_time = item.end_time;
          }
        }

      });
      if(avaiable_round !== 0) {
        setAvailableBetting(true);
        setRound(avaiable_round);
        setStartTime(start_time);
        setEndTime(end_time);
      }

    };
    fetch();
  }, []);

  const onPressSubmit = () => {
    if(!availableBetting) {
      Alert.alert('4D Betting', 'Betting is not available now!');
    }
    else  {
      if (items.filter(i => i.num && i.count)?.length > 0) {
        navigation.navigate('Invoice', {items, round})
      } else {
        Alert.alert('4D Betting', 'Please insert correct pair!');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <StatusBar style={'dark'}/>
    <Container>
    <Header>
      <Title>{!availableBetting ? 'Betting is not available': `Round ${round}`}</Title>
      <Time>{ availableBetting ? `( ${startTime} am ~ ${endTime} am )`: '' }</Time>
    </Header>
    <TicketTable items={items} handleChange={handleChange} onPressSetIncrease={onPressSetIncrease}/>
    <Divider size={verticalScale(15)}/>
    <Bottom>
      <ColorButton key={'key_1'} bgColor={'rgba(0, 141, 40, 1)'} width={'40%'} height={`${verticalScale(42)}px`} text={'Submit'} onPress={onPressSubmit}/>
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
const Time = styled(Text)`
   color: yellow;
  font-size: 15px;
  font-weight: bold
`
const Bottom = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;
export default Round;
