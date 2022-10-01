import React from 'react';

const FaceRecognition = ({imageURL}) =>{
    return(
     <div className='center ma'>
        <div className='absolute mt2'>
        <img alt='mypics' src={imageURL} width='500px' height='auto'/>
        </div>
        
     </div>
    )
}

export default FaceRecognition


// http://dreamicus.com/data/face/face-07.jpg
