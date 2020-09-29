import * as React from 'react';
import {View, Image, ImageBackground} from 'react-native';

import Images from '@/assets/Image';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import BorderButton from '@/screens/Home/Components/BorderButton';
import { useNavigation, CommonActions } from '@react-navigation/native';
import {useStores} from "../../hooks/Utils";
import StaticDigitGroup from "./Components/StaticDigitGroup";
import Spinner from 'react-native-loading-spinner-overlay';
import {Screens} from "../../constants/Navigation";
import {useState} from "react";

export default function HeaderContainer(props: any) {
  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const {user} = useStores();

  const logOut = async () => {
      setSpinner(true);
      await user.logOut();
      if(!user.isValid()) {
          setSpinner(false);
          navigation.dispatch(CommonActions.reset({index: 0, routes:[ {name: Screens.playerlogin}]}))
      }
    }
  // @ts-ignore
    return (
      <ImageBackgroundContainer source={Images.background.home_background_img}>
          <Spinner visible={spinner}/>
        <LogoImage source={Images.icon.logo}/>
        <MenuIcon name={'md-menu'} color={'white'} size={35}/>
        <LogOut onPress={logOut} text='Log out'/>
        <StaticDigitGroup number={props.number} isSpinning={props.isSpinning} setIsSpinning={props.setIsSpinning} />
          {
              user.userType == 'agent'?  <ButtonContainer>

                  <BorderButton onPress={() => navigation.navigate('Round')} text='Pay out'/>
                  <BorderButton text='Rules' onPress={() => navigation.navigate('Record')}/>
              </ButtonContainer> : <View/>
          }

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
  left: 10px;
  top: 5px;
`;
const LogoImage = styled(Image)`
  margin-top: 10px
`;
const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 20px;
  width: 250px
  flex-direction: row;
  justify-content: space-between
`;
const LogOut = styled(BorderButton)`
  position: absolute;
  right: 10px;
  top: 5px;
  width: 80px;
  height: 30px;
`;
