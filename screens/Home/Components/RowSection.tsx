import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Images from '@/assets/Image';
import {View, Text, Image} from "react-native";

const RowSection = (props: any) => {
  const [stars, setStar] = useState([]);
  useEffect(() => {
    let temp = []
    for(let i = 0; i < props.star; i++) {
      temp.push(<Image key={`star_${i}`} style={{height: 12, width: 12, resizeMode: 'contain'}} source={Images.icon.star}/>)
    }
    setStar(temp);
  }, []);
  return (
    <Container {...props}>
      {
        props.data.map((item, index) => {
          return <Item key={`item_${index}`} width={index === 0 ? '40%' : '12%'}>
            {(!props.titleIf && index === 0) &&
            <View style={{flexDirection: 'row'}}>
              <ItemText {...props} style={{width: '50%'}}>{item}</ItemText>
              <StarContainer>
                {stars}
              </StarContainer>
            </View>
            }
            {(props.titleIf || index !== 0) && <ItemText {...props}>{item}</ItemText>}
          </Item>
        })
      }
    </Container>
  )
};
const Container = styled(View)`
  width: 90%
  flex-direction: row;
  justify-content: space-between
  margin-horizontal: 4%;
  margin-top: 10px;
  padding-top: 10px
  border-color: white;
  border-top-width: ${(props: any) => !props.titleIf ? '0.5px' : '0'}
`;
const Item = styled(View)`
  width: ${(props: any) => props.width}
`;
const ItemText = styled(Text)`
  color: white;
  font-weight: ${(props: any)=> props.titleIf ? 'bold' : 'normal'}
`;
const StarContainer = styled(View)`
  flex-direction : row;
  justify-content: flex-start;
  width: 50%;
  margin-top: 3px
`;

export default RowSection;
