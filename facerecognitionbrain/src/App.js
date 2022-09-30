import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';

// const app = new Clarifai.App({
//   apiKey: '9fe5e57122de4c099b7c071e691e5771'
// });


class App extends Component{
  constructor(){
    super();
    this.state= {
      input:''
    }
  }

  onInputChange = (event)=>{
    console.log(event.target.value);
  }

  onSubmit = ()=>{
    console.log('click');
    
    
const raw = JSON.stringify({
  "user_app_id": {
      "user_id": "clarifai",
      "app_id": "main"
  },
"inputs": [
  {
    "data": {
      "image": {
        "url": "https://samples.clarifai.com/metro-north.jpg"
      }
    }
  }
]
});

const requestOptions = {
method: 'POST',
headers: {
  'Accept': 'application/json',
  'Authorization': '9fe5e57122de4c099b7c071e691e5771'
},
body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));

  
    // app.models.predict(
    //   "1ed35c3d176f45d69d2aa7971e6ab9fe", 
    //   "https://samples.clarifai.com/metro-north.jpg").then(
    //   function(response){
        
    //     console.log(response);

    //   },
    //   function(err){

    //   }
    // );
  }
  render(){

    return(
      <div>
        <Navigation/>
        <Rank/>
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange}
         onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default App;
