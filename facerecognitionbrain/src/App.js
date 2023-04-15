import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import Clarifai from 'clarifai'; 
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'b5f14b5c4bd6411fb439507cef24cd5e'
});


class App extends Component{
  constructor(){
    super();
    this.state= {
      input:'',
      imageURL:'',
      box:{},
      route:'signin',
      isSignedIn: false,
      // user: {
      //   id: '',
      //   name: '',
      //   email: '',
      //   entries: 0,
      //   joined : ''
      // }
    }
  }

  // loadUser = (data) => {
  //   this.setState({user:{
  //     id: data.id,
  //     name: data.name,
  //     email: data.email,
  //     entries: data.entries,
  //     joined : data.joined 
  //   }})
  // }


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

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});
  }

  onSubmit = ()=>{
    this.setState({imageURL: this.state.input});
    app.models
    .predict(
      'face-detection',
      // Clarifai.FACE_DETECT_MODEL, 
       this.state.input)
       .then(response =>this.dispalyFaceBox(this.calculateFaceLocation(response)))
       .catch(err => console.log(err));
  }
  render(){
    const {isSignedIn, route, imageURL, box} = this.state; 

    return(
      <div>

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'

        ? <div>
              {/* <Logo/> */}
              <Rank/>
              <ImageLinkForm onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}/>
              <FaceRecognition box={box} imageURL={imageURL}/>

           </div> 

           :(
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register /*loadUser={this.loadUser}*/ onRouteChange={this.onRouteChange}/> 
           )
           
           
         

           
        }
       
      
      </div>
    )
  }
}

//   

export default App;


