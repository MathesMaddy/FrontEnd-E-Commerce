import React, { useState } from 'react'
import {ArrowBigLeft, ArrowBigRight, Circle, CircleDot} from 'lucide-react'

const ImageSlider = ({ImagesURL}) => {

    const [imageIndex, setImageIndex] = useState(0);

    const PrevImage = () => {
      setImageIndex((index) => {
        if(index === 0) return ImagesURL.length - 1

        return index - 1
      })

    }

    const NextImage = () => {
      setImageIndex((index) => {
        if(index === ImagesURL.length - 1) return 0

        return index + 1
      })

    }
    // setInterval(() => {
    //   setImageIndex(() => {
        
    //     let val = imageIndex
    //     if(val === ImagesURL.length - 1) return 0
    //     return val + 1
    //   })
    // }, 5000);

  return (

    <div style={{width: '100%', height: '100%', position: 'relative'}} className='image-container'>
      <div style={{width: '100%', height: '100%', display: 'flex', overflow: 'hidden'}} >
        {ImagesURL.map((url) => (
            <img 
              key={url} 
              src={url} 
              className='img-slider-img' 
              style={{translate : `${-100 * imageIndex}%`}}
            />
        ))}
      </div>
        <button onClick={PrevImage} className='img-slider-btn' style={{left : '0'}}>
            <ArrowBigLeft />
        </button>
        <button onClick={NextImage} className='img-slider-btn' style={{right : '0'}}>
            
            <ArrowBigRight />
        </button>
        <div style={{position: 'absolute', left: '50%', bottom: '10px', translate: '-50%', display: 'flex', gap:'10px'}}>
            {ImagesURL.map((_, index) => (
              
              <button key={index} onClick={() => setImageIndex(index)} className='img-slider-dot-btn'>{index === imageIndex ? <CircleDot /> : <Circle />}</button>
            ))}
        </div>
        {/* <div style={{position: 'absolute', bottom: '0', color: 'white', left: '15%'}} className='image-container'>
          <h2>Iphone 16</h2>
          <p>Rs. 63999</p>
        </div> */}
    </div>
  )
}

export default ImageSlider
