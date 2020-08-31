/**
* This is the contact page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Container, View, Left, Item, Input, Toast,Text } from 'native-base';
import {TouchableOpacity} from 'react-native';
import { NavBar, Modal, GradientBtn } from '../../Common';
import { Service } from '../../Config/Services';
import {Icon} from 'react-native-elements';
import {Colors,Languages} from '../../Utils';
import { ScrollView } from 'react-native-gesture-handler';
export default class Contact extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: global.User?global.User.email:'',
        name: global.User?global.User.f_name+" "+global.User.l_name:'',
        phone_no:global.User?global.User.phone_no:'',
        subject: '',
        message: '',
        modalLoading:false,
        modalVisible:false,
        responseError:'',
        hasError: false,
        errorText: ''
      }
  }

  send=()=>{
    this.setState({loading:true})
    var param=new FormData();
    param.append("name",this.state.name);
    param.append("email",this.state.email);
    param.append("phone_no",this.state.phone_no);
    param.append("subject",this.state.subject);
    param.append("message",this.state.message);
    Service.ContactUs(param,(stat)=>this.setState({modalLoading:stat}),(stat)=>this.setState({responseError:stat}),(stat)=>this.setState({modalVisible:stat}),this.props.navigation)
  }
  sendQuery=()=> {
    if(this.state.email===""||this.state.message==="") {
      this.setState({hasError: true, errorText: Languages.RequireEnterAllFileds});
      return;
    }
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: Languages.InvalidEmail});
      return;
    }
    this.setState({hasError: false});
    this.send()
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }
  render() {
    // var left = (
    //   <Left style={{flex:1}}>
    //     <TouchableOpacity activeOpacity={0.7} transparent onPress={() =>console.log('helo')}>
    //       <Icon name="ios-close" size={38} style={{fontSize: 38,color:"#fff"}} />
    //     </TouchableOpacity>
    //   </Left>
    // );
    return(
      <Container  style={{borderTopLeftRadius:20,borderTopRightRadius:20,borderTopColor:Colors.appRed,borderTopWidth:10}}>
          {/* <NavBar left={left} title="CONTACT" /> */}
          <ScrollView 
           showsVerticalScrollIndicator={false}
          >
          <TouchableOpacity
            style={{justifyContent:'flex-end',alignItems:'flex-end',padding:10}}
            onPress={() => this.props.setVisible(false)}
            >
                <Icon name="closecircle" type="antdesign" color={Colors.appBlue}/>
            </TouchableOpacity>
            <View style={{ padding:20}}>

              <Item>
                  <Icon  name='person'  color={Colors.appRed}/>
                  
                  <Input 
                   placeholder={Languages.Name}
                  value={this.state.name} 
                  onChangeText={(name) => this.setState({name})}/>
              </Item>
              <Item>
              <Icon  name='mail'  color={Colors.appRed}/>
                  <Input placeholder={Languages.Email} value={this.state.email} keyboardType="email-address" onChangeText={(email) => this.setState({email})}/>
              </Item>
              <Item>
              <Icon  name='phone-square' type='font-awesome'  color={Colors.appRed}/>
                  <Input placeholder={Languages.Phone} value={this.state.phone_no} keyboardType="phone-pad" onChangeText={(phone_no) => this.setState({phone_no})}/>
              </Item>
              {/* <Item>
              <Icon  name='subject'  color={Colors.appRed}/>
                  <Input placeholder={Languages.Subject} onChangeText={(text) => this.setState({subject: text})}/>
              </Item> */}
              <Item>
              <Icon  name='message'  color={Colors.appRed}/>                 
               <Input
                    placeholder={Languages.Message}
                    multiline={true}
                    style={{height: 100, marginTop: -20}}
                    onChangeText={(text) => this.setState({message: text})}/>
              </Item>
              {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}

              <View style={{alignItems: 'center'}} onTouchEnd={this.sendQuery}>
                <GradientBtn
                 title={Languages.send}
                 onPress={this.sendQuery}
                />
              </View>
            </View>
         <Modal
        visible={this.state.modalVisible}
        setVisible={()=>this.setState({modalVisible:!this.state.modalVisible})}
        loading={this.state.modalLoading}
        description={this.state.responseError} />
       </ScrollView>
      </Container>
    );
  }


}