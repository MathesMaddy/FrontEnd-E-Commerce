import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import ImageSlider from './ImageSlider';
import CardProducts from './CardProducts';
import ProductsDisplay from './ProductsDisplay'


const DashBoard = ({addToCart,setAddToCart}) => {

    let isAuthentication = localStorage.getItem('user-authentication');
    if(!isAuthentication) return <Navigate to={'/'}/>

    const Images = [
        'https://www.apple.com/ph/iphone-16/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png?202502170201',
        'https://switch.com.ph/cdn/shop/articles/NPI-iPhone-16-Pro-Coming-Soon-Blog-Banners.jpg?v=1727423801',     
        'https://shop.daisycomms.co.uk/wp-content/uploads/2023/09/Apple-iPhone-15-promo-banner-buy-now-scaled.jpg',
        
    ]
    
    const [products, setProducts] = useState('');
    
    const [categoryChoosed, setCategoryChoosed] = useState('');
    const [subCategoryChoosed, setSubCategoryChoosed] = useState('');
    const [ProductsList, setProductsList] = useState([]); 
    const [ brandModels, setBrandModels ] = useState([]);    
    const [modelName, setModelName] = useState('');
    const [modelPrice, setModelPrice] = useState('');
    // const [addToCart, setAddToCart] = useState(0);
    const [modelsPrice, setModelsPrice] = useState([]);
    
    useEffect( () => {
        const FetchData = async() => {             
            try {                
                let fetchedData = await fetch('dataproducts.json')
                let data = await fetchedData.json();    
                setProducts(data.electronics)
                setCategoryChoosed(Object.keys(data.electronics)[0])
                setProductsList(Object.keys(data.electronics.Mobiles.brand))
            } 
            catch(e) {
                console.log(e)
            }
        }
        FetchData();
    }, [])

    const Logout = () => {
        localStorage.removeItem('user-authentication')
        window.location.replace('/');
    }

    const CategoryClicked = (e) => {
        e.preventDefault()
        setCategoryChoosed(e.target.value)  
        setProductsList(Object.keys(products[e.target.value].brand))
    }
    
    const SubCategoryChoosed = (e) => {
        const { value } = e.target;          
        if (value) {
            setSubCategoryChoosed(value);            
        }
        else {
            setSubCategoryChoosed('')
        }
        
        if(value) {
            setBrandModels(Object?.values(products[categoryChoosed]?.brand[value]?.model).map((item) => item.name))
            setProductsList([value]);
        }
        else {
            let obj = Object.keys(products[categoryChoosed].brand)          
            setProductsList(obj);
            setBrandModels('');
        }
    }

    const BrandModel = (e) => {
        setModelName(e.target.value)
        if(brandModels) {
            setModelsPrice(Object?.values(products[categoryChoosed]?.brand[subCategoryChoosed].model).filter((item) => item.name === e.target.value))    
        }
        else {
            setModelsPrice('')
        }
    }

    const ModelPrice = (e) => {
        setModelPrice(e.target.value)
    }

    const AddToCart = (e) => {
        let val = [...addToCart,e.target.value]
        setAddToCart(val)
        localStorage.setItem('add-to-cart', JSON.stringify(addToCart))
    }
    
  return (
    <div style={{position : 'relative'}}>
        <header style={{ 
            backgroundColor: 'rgb(153, 22, 33)', 
            height: '65px',
            color: 'white' }} 
            className='container'
            >
            <nav style={{
                height: '100%',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '1200px', 
                margin: '0 auto'}}
                >
                <div>
                    <h2 style ={{margin : '0', fontWeight: '500', fontSize: '1.5rem'}} > QuickCart </h2>
                </div>
                <div style = {{display: 'flex', justifyContent: 'space-between', width: '100px'}}>
                    <button style = {{cursor:'pointer',all: 'unset', width: '25px', position: 'relative'}} onClick={AddToCart}>

                        <Link to={'/cart'} style={{color: 'white'}}> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </Link>
                    </button>
                    <button onClick = {Logout} style = {{all : 'unset',cursor:'pointer'}}> Logout </button>
                </div>
            </nav>
        </header>

        <main style = {{
            background : '#1f1c2c',
            color : '#ada6cf'}}>
            <section>
                <div style={{ 
                    width: '100%', 
                    margin: '0 auto', 
                    aspectRatio: '5 / 2'}}>
                        <ImageSlider ImagesURL = {Images}/>
                </div>
            </section>

            <section style={{
                margin: '3px 0px 5px 0px', 
                position: 'sticky', 
                top : '0'}} 
                className='box-shadows'
                >
                <div style={{ 
                    maxWidth: '100%',  
                    padding: '15px 0', 
                    backgroundColor: '#102542'
                    }}>
                    <div action="" style={{
                        margin: '0px auto', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        width: '600px'
                        }}>
                            {Object.keys(products).map((item) => (
                                <button 
                                    style={{all: 'unset', cursor: 'pointer'}} 
                                    onClick={CategoryClicked} 
                                    value={item} 
                                    key={item} > {item} </button>
                            ))}                        
                    </div>
                </div>
            </section>
            <section>
                <div style={{
                    display : 'flex', 
                    maxWidth: '1400px', 
                    margin: '0 auto'
                    }}>
                    <div style={{
                        backgroundColor :"inherit", 
                        width : '230px', 
                        height: '380px', 
                        borderRadius: '5px', 
                        margin: '0px 0px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between' }} 
                        className='box-shadows'
                        >
                        <div>
                            <div style={{
                                borderBottom: '1px solid grey', 
                                width: '100%', 
                                padding: "10px 12px", 
                                boxSizing: 'border-box'
                                }}>
                                <h3 style={{margin : '0', fontWeight: 500}}>Categoies</h3>
                            </div>
                            <p style={{
                                margin : '5px 0', 
                                fontWeight: 400, 
                                padding: '10px 15px'
                                }}> {categoryChoosed} </p>
                        </div>
                        <div style={{
                            borderTop: '1px solid grey', 
                            margin: '0px 0px 15px'
                            }} 
                            className = "custom-select"
                            >
                            <label htmlFor="" style={{
                                display: 'block', 
                                padding: '10px 15px 10px 15px'
                                }}
                                >Brands</label>
                            <div>
                            <select 
                                className = 'custom-select' 
                                name="" 
                                id="" 
                                onChange={SubCategoryChoosed} 
                                style={{
                                    width: '85%', 
                                    margin : "0 auto", 
                                    display: 'block', 
                                    border: "1px solid grey", 
                                    borderRadius: '2px' ,
                                    }}>
                                    <option value="">--</option>
                                    {categoryChoosed ? Object?.keys(products[categoryChoosed]?.brand).map((item,index) => (
                                        <option value = {item} key = {index}> {item} </option>
        
                                    )) : ''} 
                            </select>                
                            </div>                              
                        </div>

                        <div style={{
                            borderTop: '1px solid grey', 
                            margin: '0px 0px 15px'
                            }} 
                            className = "custom-select"
                            >
                                <label htmlFor="" style={{
                                    display: 'block', 
                                    padding: '10px 15px 10px 15px'
                                }}>
                                        Models
                                </label>
                                <select 
                                    name="" 
                                    id="" 
                                    onChange = {BrandModel} 
                                    style={{
                                        width: '85%', 
                                        margin : "0 auto", 
                                        display: 'block', 
                                        border: "1px solid grey", 
                                        borderRadius: '2px' ,
                                    }}>
                                    <option value = "">--</option>
                                    {subCategoryChoosed ? brandModels.map((item,index) => (
                                        <option value = {item} key = {index}> {item} </option>
                                    )) : ''}
                                </select>                              
                        </div>

                        <div style={{
                            borderTop: '1px solid grey', 
                            margin: '0px 0px 15px'
                            }} 
                            className = "custom-select"
                            >  
                            <label htmlFor="" style={{
                                display: 'block', 
                                padding: '0px 15px 10px 15px',
                                margin: '15px 0px 0px'
                            }}> Price List </label>
                            <select 
                                onChange = {ModelPrice} 
                                name = "" 
                                id = "" 
                                style = {{
                                    width: '85%', 
                                    margin : "0 auto", 
                                    display: 'block', 
                                    border: "1px solid grey", 
                                    borderRadius: '2px' ,
                                }}>
                                <option value="" >--</option>
                                {modelsPrice.length > 0 ? modelsPrice?.map((item, index) => (
                                    <option value = {item.price} key = {index}>Rs. {item.price}</option>
                                )) : ''}
                            </select>
                        </div>
                    </div>
                    
                    <div style={{
                        backgroundColor: 'inherit', 
                        margin: '0px 0px 0px 10px', 
                        width: '100%', 
                        padding: '20px',
                        boxSizing: 'border-box', 
                        borderRadius: '5px'
                        }} 
                        className='box-shadows'
                        >
                        <ProductsDisplay 
                            categoryChoosed = {categoryChoosed} 
                            products = {products}
                            modelPrice = {modelPrice}
                            modelName = {modelName} 
                            ProductsList = {ProductsList}
                            AddToCart = {AddToCart}
                        />
                    </div>
                </div>
            </section>
        </main>
    </div>
  )
}

export default DashBoard
