
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
    View,
    Image,
    ImageBackground,
    ImageBackgroundComponent,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Images from '@/assets/Image';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useStores} from "../../../../hooks/Utils";
import {Screens} from "../../../../constants/Navigation";
import Spinner from 'react-native-loading-spinner-overlay';

const Signup = () => {
    const {user} = useStores();
    const navigation = useNavigation();
    const[phone_number, setPhoneNumber] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);
    const signUp = async () => {
        if(!phone_number && !password) {
            Alert.alert('4D Betting', 'Required Credential!')
        }
        else {
            setLoading(true);
            await user.playerSignUp(phone_number, password);
            setLoading(false);
            if(user.isValid()) {
                navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: Screens.home}]}))
            }
            else{
                Alert.alert('4D Betting', 'Invalid Credential!');
            }
        }
    };

    return (
        <ImageBackgroundContainer source={Images.background.long_bg_img}>
            <Container>
                <LoginContainer>
                    <Spinner visible={loading}/>
                    <Title>Sign Up</Title>
                    <Space height={20} />
                    <FormInputGroup>
                        <FormInputPrefix><PrefixText>+60</PrefixText></FormInputPrefix>
                        <FormPhoneInput placeholder="phone number" placeholderTextColor="grey" value={phone_number} keyboardType={'numeric'} onChangeText={(val: string) => setPhoneNumber(val)}/>
                    </FormInputGroup>
                    <Space height={15}/>
                    <FormInput placeholder="Password" placeholderTextColor="grey" value={password} secureTextEntry={true} onChangeText={(val: string) => setPassword(val)}/>
                    <Space height={15}/>
                    <SignUpDesGroup>
                        <SignUpDesText>Already have account?</SignUpDesText>
                        <SignUpText onPress={() => navigation.navigate(Screens.playerlogin)}>Sign In</SignUpText>
                    </SignUpDesGroup>
                    <Space height={40}/>
                    <SignInButton onPress={signUp}><ButtonText>Sign Up</ButtonText></SignInButton>

                </LoginContainer>
            </Container>
        </ImageBackgroundContainer>
    )
}

const ImageBackgroundContainer = styled(ImageBackground)`
  width: 100%;
  height : 100%;
  resize-mode: contain;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  
`;

const Title = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

const FormInput = styled.TextInput`
  
    background-color: rgb(51, 51, 51);
    height: 35px;
    border-radius: 5px;
    color: white;
    padding-horizontal: 10px;
  
`;

const FormPhoneInput = styled.TextInput`
    background-color: rgb(51, 51, 51);
    height: 35px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: white;
    padding-horizontal: 5px;
    flex: 8;
`;

const SignUpDesText = styled.Text`
    color: white;
    font-size: 15px;
    margin-right: 5px;
`;

const SignUpText = styled.Text`
    color: red;
    font-weight: bold;    
`

const Space = styled.View`
    height: ${(props: any) => props.height ? props.height: 10}px;
`;

const LoginContainer = styled.View`
  width: ${scale(300)};
  height: 300px;
  background-color: rgb(39, 39, 39);
  padding: 20px;
  text-align: center;
  border-radius: 5px;
`;

const SignInButton = styled.TouchableOpacity`
  height: 30px;
  background-color: rgb(247, 65, 66);
  color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const SignUpDesGroup = styled.View`
    flexDirection: row;
    flexWrap: wrap;
`;
const FormInputPrefix = styled.View`
    justify-content: center;
    align-items: center;
    background-color: rgb(51, 51, 51);
    border-color:  rgb(51, 51, 51);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: 5px;
    flex: 1;
    height: 35px;
`;

const PrefixText = styled.Text`
    color: white;
    font-weight: bold;
`;
const FormInputGroup = styled.View`
    flexDirection: row;
    flex: 1;
    flexWrap: wrap;
   
    justify-content: center;
`;

export default Signup;
