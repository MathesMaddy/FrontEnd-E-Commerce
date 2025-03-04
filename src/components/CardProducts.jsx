import React from 'react'

const CardProducts = ({name, price, description, picture, AddToCart}) => {
  return (
    <div style={{height: '580px', padding: '0px 20px'}} >
        <div style={{width : '250px', height: '580px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            
            <div style={{textAlign: 'center'}}>
                <img src={picture} alt="" width={'200px'}/>
            </div>
            <div>
               <h2 style={{margin: '5px 0px'}}>{name}</h2>
            </div>            
            <div>
                <p style={{margin: '10px 0px'}}>Rs. {price}</p>
            </div>
            <div>
                <p style={{textAlign: 'justify', margin: '10px 0px'}}>{description}</p>
            </div>
            <div>
                
                <button onClick={AddToCart} value={name+","+price} style={{all : 'unset', padding: '10px 20px', border:'1px solid white', backgroundColor : 'rgb(16, 37, 66)'}}>Add to Card</button>
            </div>
        </div>     
      
    </div>
  )
}

export default CardProducts
