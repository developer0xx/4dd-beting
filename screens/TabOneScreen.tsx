import * as React from 'react';
import {ScrollView, Image} from 'react-native';

import styled from 'styled-components/native';
import HeaderContainer from '@/screens/Home/HeaderContainer';

export default function TabOneScreen() {
  return (
    <Container>
      <HeaderContainer/>
    </Container>
  );
}

const Container = styled(ScrollView)`

`;
