import * as React from 'react';
import {View, Image, ImageBackground} from 'react-native';

import Images from '@/assets/Image';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import DigitGroup from '@/screens/Home/Components/DigitGroup';
import BorderButton from '@/screens/Home/Components/BorderButton';
import { useNavigation } from '@react-navigation/native';

export default function HeaderContainer() {
  const navigation = useNavigation();
  return (
      <ImageBackgroundContainer source={Images.background.home_background_img}>
        <LogoImage source={Images.icon.logo}/>
        <MenuIcon name={'md-menu'} color={'white'} size={35}/>
        <DigitGroup/>
        <ButtonContainer>
          <BorderButton onPress={() => navigation.navigate('Round')} text='Pay out'/>
          <BorderButton text='Rules'/>
        </ButtonContainer>
      </ImageBackgroundContainer>
  );
}

const ImageBackgroundContainer = styled(ImageBackground)`
  width: 100%;
  height : 400px
  resize-mode: contain;
  align-items: center;
`;
const MenuIcon = styled(Ionicons)`
  position:absolute;
  left: 10;
  top: 5
`;
const LogoImage = styled(Image)`
  margin-top: 10
`;
const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 20px;
  width: 250px
  flex-direction: row;
  justify-content: space-between
`;
