import React from 'react';
import styled from 'styled-components/native';
import {Text, View} from "react-native";
import RowSection from '@/screens/Home/Components/RowSection';

const DetailViewPanel = (props: any) => {
  const titleData = ['Prizes','A','B','C','D','E'];
  const data = [
    ['1st Prizes', 1177, 9951, 6921, '', ''],
    ['2nd Prizes', 1188, 1595, 7535, 139, ''],
    ['3rd Prizes', 7720, 5522, 1346, 1328, 9673]
  ];
  const stars = [3, 4, 5];
  return (
    <Container {...props}>
      <Title {...props}>{props.title}</Title>
      <CustomText>{props.date}</CustomText>
      <DividerLine {...props}/>
      <RowSection data={titleData} titleIf={true}/>
      {data.map((item, index) => {
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
