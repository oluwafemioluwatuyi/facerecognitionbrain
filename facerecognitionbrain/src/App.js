import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '9fe5e57122de4c099b7c071e691e5771'
});


class App extends Component{
  constructor(){
    super();
    this.state= {
      input:'',
      imageURL:'',
    }
  }

  onInputChange = (event)=>{
    this.setState({input:event.target.value});
  }

  onSubmit = ()=>{
    this.setState({imageURL: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
       this.state.input).then(
      function(response){
        
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

      },
      function(err){

      }
    );
  }
  render(){

    return(
      <div>
        <Navigation/>
        <Rank/>
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange}
         onSubmit={this.onSubmit}/>
         <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    )
  }
}

export default App;
