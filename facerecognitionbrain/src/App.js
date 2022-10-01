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
      box:{},
    }
  }

  calculateFaceLocation =(data)=>{
    const clarifaiFace =data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow:  clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height) 
    }

  }

  dispalyFaceBox = (box)=>{
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event)=>{
    this.setState({input:event.target.value});
  }

  onSubmit = ()=>{
    this.setState({imageURL: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
       this.state.input)
       .then(response =>this.dispalyFaceBox(this.calculateFaceLocation(response)))
       .catch(err => console.log(err));
  }
  render(){

    return(
      <div>
        <Navigation/>
        <Rank/>
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange}
         onSubmit={this.onSubmit}/>
         <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
      </div>
    )
  }
}

//   

export default App;
