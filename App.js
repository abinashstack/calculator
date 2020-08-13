import React,{useState, Component} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';


export default class App extends Component {
  constructor(){
    super()
    this.state = {
      resulttext: ""
    }
    this.operators=['del','+','-','*','/']
  }
  calculate(){
    const text=this.state.resulttext
    this.setState({
      calculation:eval(text)
    })
    

  }
  validate(){
    const text=this.state.resulttext
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }
  buttonpressed(text){
    if (text=='='){
      return this.validate() && this.calculate()
    }
    this.setState({
      resulttext:this.state.resulttext+text
    })
  }
  operate(operation){
    switch(operation){
      case 'del':
        let text=this.state.resulttext.split('')
        text.pop()
        this.setState({
          resulttext:text.join('')
        })
        break
      case '+':
      case '-':
      case '/':
      case '*':
        const lastchar=this.state.resulttext.split('').pop()
        if (this.operators.indexOf(lastchar)>0){
          return
        }
        if (this.state.text==''){
          return
        }
        this.setState({
          resulttext:this.state.resulttext+operation
        })
        
    }
  }


  render(){
  let rows=[]
  let nums=[[1,2,3],[4,5,6],[7,8,9],[0,'=','.']]
  for(let i=0;i<4;i++){
    let row=[]
    for(let j=0;j<3;j++){
      row.push(<TouchableOpacity key={nums[i][j]} onPress={()=>this.buttonpressed(nums[i][j])}>
        <Text style={styles.text8}>{nums[i][j]}</Text>
      </TouchableOpacity>)

    }
    rows.push(<View key={i} style={styles.row}>{row}</View>)
  }
  
  let ops=[]
  for(let j=0;j<5;j++){
    ops.push(<TouchableOpacity key={this.operators[j]} onPress={()=>this.operate(this.operators[j])} style={styles.btn}>
      <Text style={styles.text8}>{this.operators[j]}</Text>
    </TouchableOpacity>)
  }


    return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.text1}>{this.state.resulttext}</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.text2}>{this.state.calculation}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.number}>
          {rows}
        </View>
        <View style={styles.operations}>
          {ops}
        </View>
      </View>
    </View>
  );
    
    
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn:{
    flex:1,
   alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'

  },
  text1:{
    fontSize:40,
    color:'white',
    textAlign:'left',

  },
  text8:{
    fontSize:40,
    color:'black',
    textAlign:'left',

  },
  text2:{
    fontSize:40,
    color:'red',
    textAlign:'left',

  },
  row:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-evenly',
    alignItems:'center'

  },
  number:{
    flex:3,
    backgroundColor:'yellow'

  },
  operations:{
    justifyContent:'space-evenly',
    flex:1,
    backgroundColor:'white'


  },
  buttons:{
    flex:7,
    flexDirection:'row',
    backgroundColor:'red'

  },
  result:{
    flex:2,
    alignItems:'flex-end',
    backgroundColor:'blue',
    justifyContent:'center',


  },
  calculation:{
    flex:1,
    alignItems:'flex-end',
    backgroundColor:'white'

  },

});


