import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Constants } from 'expo';
import Clock from 'react-live-clock'

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
      return {
          title : `날씨정보 : ${navigation.getParam('city', 'Unknown')}`,
      }
  }


  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    //const city = navigation.getParam('city', null);
    const city = 'Daejeon';

    fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  

  render() {

      
      

      if(this.state.isLoading)
      {
        return (
            <View style={styles.loadingContainer}>
                <Text style = {styles.text}>데이터를 불러오는 중입니다.</Text>
            </View>
        );
      }

      let celsius = this.state.main.temp - 273.15;
      let celsius_min = this.state.main.temp_min - 273.15;
      let celsius_max = this.state.main.temp_max - 273.15;



      let sunString = "햇빛 볼 시간입니다!\n 나갈 준비 하세요!"
      let rainString = "구름이 울고 있네요.\n 막아줄 우산을 준비하세요."

      let background = './assets/night.jpg'
      
      return(
        
        <ImageBackground source = {require(background)} resizeMode = 'cover' style={styles.backGroudStyle}>
          
          <View style = {styles.firstContainer}>
              <Text style = {styles.firstText}>{'\n'}{sunString}</Text>
          </View> 
          <View style= {styles.mainContainer}>
            <View style = {styles.iconContainer}>
              <Image style = {styles.imageStyle} source = {require('./assets/sun.png')}/>
              <Text style = {styles.iconText}>맑음</Text>
            </View>
            <View style = {styles.tempContainer}>
              <Text style = {styles.celsiusText}>{celsius.toFixed(1)}C</Text>
              <Text style = {styles.celsiusSubText}>최저 {celsius_min.toFixed(1)}C 최고 {celsius_max.toFixed(1)}C</Text>
              
            </View>
          </View>
          <View style = {styles.lastContainer}>
            <View style = {styles.subContainer}>
              <Image style = {{width : 50, height : 50}} source = {require('./assets/wind.png')}/>
              <Text style = {{fontSize : 35}}>{this.state.wind.speed}노트</Text>
              <Text style = {{fontSize : 25}}>풍속</Text>
            </View>
            <View style = {styles.subContainer}>
              <Image style = {{width : 50, height : 50}} source = {require('./assets/drop.png')}/>
              <Text style = {{fontSize : 35}}>{this.state.main.humidity}</Text>
              <Text style = {{fontSize : 25}}>습도</Text>
            </View>
            <View style = {styles.subContainer}>
              <Image style = {{width : 50, height : 50}} source = {require('./assets/cloud.png')}/>
              <Text style = {{fontSize : 35}}>{this.state.clouds.all}</Text>
              <Text style = {{fontSize : 25}}>구름</Text>
            </View>
          </View>
          
        </ImageBackground>
        
      )
  }
}

const styles = StyleSheet.create({

  container : {
    flex : 1,
    backgroundColor : '#fff',
    //marginTop : Constants.statusBarHeight
  },

  backGroudStyle : {
    
    width : '100%',
    height : '100%',
   
  },

  firstContainer : {
    flex : 1,
    backgroundColor : '#fff',
  },


  mainContainer: {
    flex: 2,
    flexDirection : "row",
    backgroundColor: '#fff',
    alignItems : 'center',

    
    borderColor: 'red',
    borderWidth: 2,

    
  },

  iconContainer : {
    flex : 1,
    alignItems : 'center',
    
    borderColor: 'red',
    borderWidth: 2,
  },

  tempContainer : {
    flex : 1,

    borderColor: 'red',
    borderWidth: 2,
  },
  
  
  lastContainer : {
    flex : 2,
    flexDirection : 'row',
    backgroundColor: '#fff',
    

    borderColor: 'blue',
    borderWidth: 2,
  },

  subContainer : {
    flex : 1,
    backgroundColor: '#fff',
    alignItems : 'center',

    borderColor: 'blue',
    borderWidth: 2,
  },
  

  firstText : {
    fontSize : 30,
    textAlign : 'center',
    
    borderColor: 'black',
    borderWidth: 2,
  },

  iconText : {
    fontSize : 25,
    textAlign : 'center',

    
  },

  celsiusText :{
    fontSize : 60,
    textAlign: 'center',
  },

  celsiusSubText : {
    fontSize : 20,
    textAlign : 'center'
  },

  imageStyle : {
    width : 140,
    height : 140,
  },

  loadingContainer: {
    flex : 1,
    backgroundColor : '#fff',
    marginTop: Constants.statusBarHeight,

  }
});