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


const daily_prizes = {
  time: ['12:15PM', '1:00PM', '3:00PM', '5:00PM', '9:00PM'],
  number: [4588, 3255, 5200, 3300, 5757]
}

export default function Home() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}} edges={['top']}>
      <Container>
        <HeaderContainer/>
        <NumberView>
          <NumberPanel baseColor={'yellow'} title='Dialy Prizes' date='30/8/2020' data={daily_prizes}/>
          <NumberPanel baseColor={'red'} title='Mega Jackpot' date='30/8/2020' data={daily_prizes}/>
        </NumberView>
        <Divider size={20}/>
        <DetailViewPanel title='Thursday Jackpot' baseColor='rgba(0, 163, 41, 1)' date='30/8/2020'/>
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

