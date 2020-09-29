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
import {useStores} from "../../../hooks/Utils";
import {Screens} from "../../../constants/Navigation";
import Spinner from 'react-native-loading-spinner-overlay';


const SignIn = () => {
    const navigation = useNavigation();
    const {user}  = useStores();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[loading, setLoading] = useState(false);

    const signIn = async () => {
        if(!username || !password) {
            Alert.alert('4D Betting','Required Credential!')
        }
        else{
            setLoading(true);
            await user.agentLogin(username, password);

            if(user.isValid()) {
                navigation.dispatch(CommonActions.reset({index: 0, routes: [{name: Screens.home}]}))
            }
            else {
                Alert.alert('4D Betting', 'Invalid Credential!');
                setTimeout(() => {  setLoading(false);}, 3000)
            }

        }
    };
    return (
        <ImageBackgroundContainer source={Images.background.long_bg_img}>
            <Container>
                <LoginContainer>
                    <Spinner visible={loading}/>
                    <Title>Agent Sing In</Title>
                    <Space height={20} />
                    <FormInput placeholder="Username" value={username} placeholderTextColor="grey" onChangeText={(text: string) => setUsername(text)}/>
                    <Space height={15} />
                    <FormInput placeholder="Password" value={password} placeholderTextColor="grey" secureTextEntry={true}  onChangeText={(text:string) => setPassword(text)}/>
                    <Space height={15}/>
                    <Space height={20}/>
                    <SignInButton onPress={signIn}><ButtonText>Sign In</ButtonText></SignInButton>
                    <Space height={25}/>
                    <AgentNavigation>
                        <SignUpText onPress={() => navigation.navigate(Screens.playerlogin)}>Player Sign In</SignUpText>
                    </AgentNavigation>
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
    border-radius: 3px;
    color: white;
    padding-horizontal: 10px;
  
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

const AgentNavigation = styled.View`
    justify-content: center;
    align-items: center;
`;


export default SignIn;
