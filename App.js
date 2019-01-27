import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-ionicons';


export default class App extends Component {
  id=0;
  state={text:'',todoList:[]};
  addTodo(){
    if(this.state.text!=""){
      todo={
        id:this.id++,
        name:this.state.text,
        completed:false
      }
      this.setState({text:''});
      this.state.todoList.push(todo);
    }
  }
  changeStatus(id){
    var list=this.state.todoList;
    list.map(function(x){
      if(x.id==id){
        x.completed=!x.completed;
        
      }  
    });
    return this.setState({todoList:list});
  }


  
  deleteTodo(id){
    var list=this.state.todoList;
    i=0;
    list.map(function(x){
      if(x.id===id){
        list.splice(i,1);
      }
      i++;
    });
    return this.setState({todoList:list});
   }

  showTodo(){
    return this.state.todoList.map((x)=><View key={x.id} style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{fontSize:17}}>{x.id} </Text>
      <TouchableOpacity onPress={()=>this.changeStatus(x.id)} style={{flexDirection:'row'}}>
      <Text style={{fontSize:17,textDecorationLine:x.completed?"line-through":"none"}}>{x.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.deleteTodo(x.id)} style={{justifyContent:'center',marginLeft:5,alignItems:'center',padding:5}}>
        <Icon size={17} name="remove-circle"/>
      </TouchableOpacity>

    </View>)
  }

  render() {
    return (
      <View style={{padding:5,marginBottom:30}}>    
      <View style={{flexDirection:'row',backgroundColor:'#DCDCDC',borderColor:'grey',borderWidth:0.6}}>
      <TextInput maxLength={20} required value={this.state.text} onChangeText={text=>this.setState({text:text})} style={{width:300}} placeholder="e.g Have to read book"/>
      <View style={{justifyContent:'center',padding:5,marginLeft:15}}>
        <TouchableOpacity onPress={()=>this.addTodo()}>
        <Icon name="add"/>
        </TouchableOpacity>
        </View> 
      </View>
      <ScrollView style={{marginBottom:20}}>
      {this.showTodo()}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
