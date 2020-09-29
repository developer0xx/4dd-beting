import React, {useEffect, useState} from 'react';
import {Animated, ScrollView, Text, View, Image, StyleSheet, Alert} from "react-native";
import styled from 'styled-components/native';
import Images from '@/assets/Image';
import {Divider} from "@/components/BaseUtils";
import InvoiceDetails from '@/screens/Invoice/Components/InvoiceDetails';
import TicketView from '@/screens/Invoice/Components/TicketView';
import TotalView from '@/screens/Invoice/Components/TotalView';
import PlayerIdInput from '@/screens/Invoice/Components/PlayerIdInput';
import ColorButton from '@/components/ColorButton';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useNavigation} from '@react-navigation/native';
import {getDate, getTime} from "../../utils/getDate";
import axios from 'axios';
import {Config} from "../../constants/Config";
import Spinner from 'react-native-loading-spinner-overlay';

const Invoice = (props: any) => {
    const navigation = useNavigation();
    const data = props.route.params.items.filter(i => i.num && i.count);
    const round = props.route.params.round;
    const agent_name = Config.agent_name;
    const total_amount = data.reduce((a, {count}) => a + count, 0);
    const date = getDate();
    const time = getTime();
    const [invoicenumber, setInvoiceNumber] = useState(0);
    const [spinner, setSpinner] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            const res = await axios(Config.api_url + 'getInvoiceNumber');
            console.log(res.data);
            setInvoiceNumber(res.data.invoice);
        }
        fetch();
    });
    const [player_id, setPlayerId] = useState('');
    const handleChange = (e) => {
        setPlayerId(e);
    };

    const confirmInvoice = async () => {
        if(player_id) {
            setSpinner(true);
            let request_data = {
                player_id: player_id.toLowerCase(),
                round_id: round,
                total_amount: total_amount,
                invoice_time: time,
                invoice_date: date,
                ticket_data: data,
                invoice_number: invoicenumber,
                agent_id: Config.agent_id
            };
            const res = await axios({method: 'post', url: Config.api_url + 'buy_ticket', data: request_data});
            if (res) {
                console.log(res);
                if(res.data.status.errorCode) {
                    setSpinner(false);
                    setTimeout(()=> {
                        Alert.alert('4D Betting', res.data.data);
                        setPlayerId('');
                    }, 500)

                }
                else {
                    setSpinner(false);
                    setTimeout(() => {
                        Alert.alert('4D Betting', res.data.data);
                        navigation.navigate('Record');
                    }, 500);

                }

            }
        }
        else{
            Alert.alert('4D Betting', 'Player Id is required!')
        }

    };

    return (
        <SafeAreaView style={{flex: 1}} edges={['top']}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <StatusBar style={'dark'}/>
            <Container>
                <Header>
                    <Logo source={Images.icon.logo}/>
                    <TitleLogo source={Images.icon.invoice_logo}/>
                </Header>
                <Divider size={verticalScale(20)}/>
                <Body>
                <InvoiceDetails name={agent_name} round={round} date={date} time={time} invoicenumber={invoicenumber}/>
                <Divider size={verticalScale(30)}/>
                <TicketView data={data}/>
                <Divider size={verticalScale(20)}/>
                <TotalView total={total_amount}/>
                <Divider size={verticalScale(20)}/>
                <PlayerIdInput playerId={player_id} handleChange={handleChange}/>
                </Body>
                <Divider size={verticalScale(20)}/>
                <Bottom>
                    <ColorButton bgColor={'rgba(221, 0, 19, 1)'} width={'40%'} onPress={() => navigation.goBack()}
                                 text={'Cancel'}/>
                    <ColorButton bgColor={'rgba(0, 141, 40, 1)'} width={'40%'} onPress={confirmInvoice}
                                 text={'Confirm'}/>
                </Bottom>
            </Container>
        </SafeAreaView>)
};

const Container = styled(ScrollView)`
  flex: 1
`;
const Header = styled(View)`
  height: 60px;
  background-color: #000;
  justify-content: center
`;
const Logo = styled(Image)`
  width: 70px;
  height: 50px;
  resize-mode: contain;
  margin-left: 5%
`;
const TitleLogo = styled(Image)`
  position: absolute;
  right: 0;
  top: 0
  height: 65px;
  width: 70%
  resize-mode: cover;
`;
const Body = styled(View)`
  padding-horizontal: 5%
`;
const Bottom = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: 'blue'
    }

});

export default Invoice;
