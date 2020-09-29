import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Text, View} from "react-native";
import RowSection from '@/screens/Home/Components/RowSection';
import axios from 'axios';
import {Config} from "../../../constants/Config";
import {addPad} from "../../../utils/addPad";
import Pusher from 'pusher-js/react-native';

const Initial_data = [
    ['1st Prizes', 1111, 1111, 1111, '', ''],
    ['2nd Prizes', 2222, 2222, 2222, 2222, ''],
    ['3rd Prizes', 3333, 3333, 3333, 3333, 3333]
];
const getDate = (temp_date: string) => {
    let today = new Date(temp_date);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    const date  = mm + '/' + dd + '/' + yyyy;

    return date;
}
let pusher = new Pusher('f1ff9b538a235f2a6d10', {
    cluster: 'us3'
});
const DetailViewPanel = (props: any) => {
  const titleData = ['Prizes','A','B','C','D','E'];
  const key = ['1_1_prize', '1_2_prize', '1_3_prize', '2_1_prize', '2_2_prize', '2_3_prize', '2_4_prize', '3_1_prize', '3_2_prize', '3_3_prize', '3_4_prize', '3_5_prize'];
  const[thursday_data, setThursdayData]=useState(Initial_data);

  const[date, setDate] = useState('1/01/1970');
  const stars = [3, 4, 5];

  useEffect(() => {
      const fetchData = async () => {
          const res = await axios(Config.api_url + 'getResult');
          const temp_data = res.data[0].thursday_data;
          let prize_1 = ['1st Prizes']; let prize_2 = ['2nd Prizes']; let prize_3 = ['3rd Prizes'];
          key.forEach((item, index) => {
              if(index < 3) {
                  prize_1.push(temp_data[item]);
              }
              if( 3 <= index && index < 7) {
                  prize_2.push(temp_data[item])
              }
              if(index >= 7) {
                  prize_3.push(temp_data[item])
              }
          }); prize_1.push(''); prize_1.push(''); prize_2.push('');
          setDate(getDate(temp_data.date));
          setThursdayData([prize_1, prize_2, prize_3]);
      }
      fetchData();

      //Set Pusher library;

      let channel = pusher.subscribe('setThursdayJackpot');
      channel.bind('setThursdayResult', function (data: any) {
          let prize_1 = ['1st Prizes']; let prize_2 = ['2nd Prizes']; let prize_3 = ['3rd Prizes'];
          key.forEach((item, index) => {
              if(index < 3) {
                  prize_1.push(data.message[item]);
              }
              if( 3 <= index && index < 7) {
                  prize_2.push(data.message[item])
              }
              if(index >= 7) {
                  prize_3.push(data.message[item])
              }
          }); prize_1.push(''); prize_1.push(''); prize_2.push('');
          setDate(getDate(data.message.date));
          setThursdayData([prize_1, prize_2, prize_3]);
      });

  }, []);
  return (
    <Container {...props}>
      <Title {...props}>{props.title}</Title>
      <CustomText>{date}</CustomText>
      <DividerLine {...props}/>
      <RowSection data={titleData} titleIf={true}/>
      {thursday_data.map((item, index) => {
        return <RowSection key={`row_${index}`} data={item} titleIf={false} star={stars[index]}/>
      })}
    </Container>
  )
};

const Container = styled(View)`
  width: ${(props:any) => props.width ? props.width : '95%'};
  padding-bottom : 10px
  border-radius: 10px;
  border-width: 2px;
  border-color: ${(props:any) => props.baseColor};
  align-items: center
  align-self: center;
`;

const Title = styled(Text)`
  margin-top: 10px
  color: ${(props:any) => props.baseColor};
  font-size: 16px;
  font-weight: bold
`;
const CustomText = styled(Text)`
  margin-top: 5px;
  color: white;
  text-align: center
`;
const DividerLine = styled(View)`
  border-width: 2px;
  border-top-color: ${(props:any) => props.baseColor};
  height: 10px;
  width: 10%;
  margin-top: 10px
`;

export default DetailViewPanel;
