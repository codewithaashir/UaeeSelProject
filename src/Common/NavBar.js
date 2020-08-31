// React native and others libraries imports
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';
import {Colors} from '../Utils';

// Our custom files and classes import

export default class Navbar extends Component {
  render() {
    return(
      <Header
        style={{backgroundColor: Colors.appRed}}
        backgroundColor={Colors.appRed}
        androidStatusBarColor={Colors.appRed}
        noShadow={true}
        >
        {this.props.left ? this.props.left : <Left style={{flex: 1}} />}
        <Body style={styles.body}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{flex: 1}} />}
      </Header>
    );
  }
}

const styles={
  body: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: '100'
  }
};