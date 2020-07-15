import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, Image, Dimensions, ImageBackground, TouchableOpacity} from "react-native";
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Images from '@/assets/Image';
import {Divider} from "@/components/BaseUtils";
import NumberPanel from '@/screens/Home/Components/NumberPanel';
import ColorButton, {GradientButton} from '@/components/ColorButton';
import DetailViewPanel from '@/screens/Home/Components/DetailViewPanel';
import Modal from 'react-native-modal';

const Home = (props: any) => {
  const [width, setWidth] = useState('10%');
  const [detailWidth, setDetailWidth] = useState('25%');
  const [fontSize, setFontSize] = useState('22px');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (Dimensions.get('window').width < 1400) {
      setWidth('15%');
      setDetailWidth('45%');
      setFontSize('18px')
    }
  }, []);
  const daily_prizes = {
    time: ['12:15PM', '1:00PM', '3:00PM', '5:00PM', '9:00PM'],
    number: [4588, 3255, 5200, 3300, 5757]
  };


  return <Container>
    <Background source={Images.background.home_bg_web}>
      <Logo source={Images.icon.logo}/>
      <BtnGroup>
        <GradientButton bgColor={'rgba(136, 0, 7, 1)'} width={'100%'} text={'Bet Now'} color={'rgba(187, 162,58,1)'} height={'70px'} fontSize={'38px'} borderWidth={'4px'} colors={['rgba(102,11,11,1)', 'rgba(167, 11, 20, 1)']}/>
        <Divider size={20}/>
        <SubBtnGroup>
        <GradientButton onPress={() => setVisible(true)} bgColor={'rgba(136, 0, 7, 1)'} width={'45%'} text={'Pay Out'} color={'rgba(187, 162,58,1)'} fontSize={fontSize} colors={['rgba(35,22,18,1)', 'rgba(26,2,3)']}/>
        <GradientButton bgColor={'rgba(136, 0, 7, 1)'} width={'45%'} text={'Rules'} color={'rgba(187, 162,58,1)'} fontSize={fontSize} colors={['rgba(35,22,18,1)', 'rgba(26,2,3)']}/>
        </SubBtnGroup>
      </BtnGroup>
    </Background>
    <Divider size={50}/>
    <NumberView>
      <NumberPanel width={width} baseColor={'yellow'} title='Dialy Prizes' date='15/6/2020' data={daily_prizes}/>
      <NumberPanel width={width} baseColor={'red'} title='Mega Jackpot' date='15/6/2020' data={daily_prizes}/>
      <DetailViewPanel width={detailWidth} title='Thursday Jackpot' baseColor='rgba(0, 163, 41, 1)' date='15/6/2020'/>
    </NumberView>
    {/*<Modal isVisible={visible}>*/}
      {/*<View style={{marginTop: 50, flex: 1, backgroundColor: 'white'}}>*/}
      {/*<Text>hello</Text>*/}
      {/*<TouchableOpacity onPress={() => setVisible(false)}>*/}
        {/*<Text>close</Text>*/}
      {/*</TouchableOpacity>*/}
      {/*</View>*/}
    {/*</Modal>*/}
  </Container>
};

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #000;
`;
const Background = styled(ImageBackground)`
  width : 100%;
  height: ${Dimensions.get('window').width/3.45}
  resize-mode: contain;
`;
const Logo = styled(Image)`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 100px;
  height: 40px;
  resize-mode: contain
`;
const BtnGroup = styled(View)`
  position: absolute;
  top: 40%;
  left : 34%;
  width : 15%;
`;
const SubBtnGroup = styled(View)`
  flex-direction : row;
  justify-content: space-between
`;
const NumberView = styled(View)`
  flex-direction: row;
  justify-content: center
`;
export default Home;
