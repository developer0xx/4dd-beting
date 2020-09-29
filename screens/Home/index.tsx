import * as React from 'react';
import {ScrollView, Image, View} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
// @ts-ignore
import HeaderContainer from '@/screens/Home/HeaderContainer'
import NumberPanel from '@/screens/Home/Components/NumberPanel';
import DetailViewPanel from '@/screens/Home/Components/DetailViewPanel';
import {Divider} from "@/components/BaseUtils";
import {SafeAreaView} from "react-native-safe-area-context";
import { Config } from '../../constants/Config';
import {useEffect, useState} from "react";
import axios from 'axios';
import Pusher from 'pusher-js/react-native';
import { getDate } from "../../utils/getDate";
import { addPad } from "../../utils/addPad";



const daily_prizes = {
  time: ['12:15PM', '1:00PM', '3:00PM', '5:00PM', '9:00PM'],
  number: [0, 0, 0, 0, 0]
}
let pusher = new Pusher('f1ff9b538a235f2a6d10', {
  cluster: 'us3'
});

export default function Home() {
  const[daily_data, setDialyPrizes] = useState(daily_prizes);
  const[date, setDate] = useState(getDate());
  const[realnumber, setRealNumber] = useState(["1", "2", "3", "4"]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(Config.api_url + 'getResult');
      let temp_data = res.data;
      let temp_time: any[] = []; let temp_number: any[] = [];
      temp_data[0].daily_data.map((item: any) => {
        temp_time.push(item.start_time);
        temp_number.push((item.striker_number));
      });
      if(temp_data.length !== 0  && temp_number.length !== 0) {
        setDialyPrizes({time: temp_time, number: temp_number});
      }

      let newRealNumber: string | any[] | ((prevState: string[]) => string[]) = [];
      temp_data[0].daily_data.forEach(function (item: any) {
        if(item.striker_number != 0) {
          let newRealNumber_arry = addPad(item);
          newRealNumber = [newRealNumber_arry[0], newRealNumber_arry[1], newRealNumber_arry[2], newRealNumber_arry[3]]
        }
      });
     if(newRealNumber.length) {
       setRealNumber(newRealNumber);
       setIsSpinning(true);
     }

    };
    fetchData();

    //Set Pusher Channel

    let channel = pusher.subscribe('setMatch');
    channel.bind('set-result', function (data: { message: any[]; }) {

      let newRealNumber: React.SetStateAction<string[]> = [];
      data.message.forEach(function (item: any) {
        if(item.striker_number != 0) {
          let newRealNumber_arry = addPad(item);
          newRealNumber = [newRealNumber_arry[0], newRealNumber_arry[1], newRealNumber_arry[2], newRealNumber_arry[3]]
        }
      });

      setRealNumber(newRealNumber);
      setIsSpinning(true);
      let temp_time: any[] = []; let temp_number: any[] = [];
      data.message.map((item: any) => {
        temp_time.push(item.start_time);
        temp_number.push(item.striker_number);
      });

      setDialyPrizes({time: temp_time, number: temp_number});
    });

  },[]);


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}} edges={['top']}>
      <Container>
        <HeaderContainer number={realnumber} isSpinning={isSpinning} setIsSpinning={setIsSpinning}/>
        <NumberView>
          <NumberPanel baseColor={'yellow'} title='Dialy Prizes' date={date} data={daily_data}/>
          <NumberPanel baseColor={'red'} title='Mega Jackpot' date={date} data={daily_data}/>
        </NumberView>
        <Divider size={20}/>
        <DetailViewPanel title='Thursday Jackpot' baseColor='rgba(0, 163, 41, 1)' date={date}/>
        <Divider size={20}/>
      </Container>
    </SafeAreaView>

  );
}
const NumberView = styled(View)`
  flex-direction: row;
  justify-content: space-around
`;
const Container = styled(ScrollView)`
  background-color: black;
`;

