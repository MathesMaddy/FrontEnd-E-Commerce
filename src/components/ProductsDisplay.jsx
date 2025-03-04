import React from 'react'
import CardProducts from './CardProducts'

const ProductsList = ({categoryChoosed, products, modelPrice, modelName, ProductsList, AddToCart}) => {
  return (
    <>
        <div>
                    
            <div style={{}}>
                <h2 style={{margin: '5px 0px'}}>{categoryChoosed}</h2>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent:'space-between'}}>
                    {ProductsList.length ? ProductsList.map((item,index) => (
                        <div key={item} style={{display : 'flex', width: '100%'}}>
                        {console.log(item)}
                        {Object.values(products[categoryChoosed].brand[item].model).map((itemI) => (
                            <div className='image-container' style={{height : '580px', margin: '25px 0'}}>
                                {console.log(modelName)}
                                { modelPrice ? modelPrice == itemI.price ?
                                    <CardProducts 
                                        name = {itemI.name} 
                                        price = {itemI.price} 
                                        description = {itemI.description} 
                                        picture = {itemI.picture}
                                        AddToCart = {AddToCart}
                                    /> 
                                    : '' : modelName ? modelName == itemI.name ?
                                    <CardProducts 
                                        name = {itemI.name} 
                                        price = {itemI.price} 
                                        description = {itemI.description} 
                                        picture = {itemI.picture}
                                        AddToCart = {AddToCart}
                                    />   : '' : 
                                    <CardProducts 
                                        name = {itemI.name} 
                                        price = {itemI.price} 
                                        description = {itemI.description}
                                        picture = {itemI.picture} 
                                        AddToCart = {AddToCart}
                                    />
                                }
                            </div>
                        ))}
                        
                        </div>
                    )) : ''}
                </div>
                        
            </div>
                           
        </div>  
    
    </>
  )
}

export default ProductsList
