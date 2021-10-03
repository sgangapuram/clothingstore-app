import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductComponent from "./ProductComponent";
import axios from "axios";
import {setProducts} from "../actions/productactions";

const ProductListing = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();

    const [state, setCompleteState] = useState(()=>{
        console.log('----->>>>>>Arrow Function version of updating state calls only first time<<<<<<<-----');
        return {count:1, theme:'Orange', pokemon:["bulbasaur", "charmander"]};
    });

    const count = state.count;
    const theme = state.theme;
    const pokemon = state.pokemon;

    console.log("%%%%%%%%***products before making axios API call***%%%%%%%%"+products)
    console.log('**********----------default state from app component called----**********');
    const fetchProducts = async () =>{
        const response = await axios
            .get("https://fakestoreapi.com/products")
            .catch((err) => {
                console.log("Errrrrrrr", err);
            });
        console.log(response.data);
        console.log("dispatch to update products called with response data from api");
        products.forEach(duct => {duct.price +='xxxxxx'});
        dispatch(setProducts(response.data));
    }

    useEffect(()=>{
        fetchProducts();
    }, []);

    console.log("products: ", products);
    //understanding the state update with taking prev state and merging it(...prevState) with specific new fields update
    function incrementCount() {
        setCompleteState((prevState)=>{return {...prevState, count:count+1, pokemon: ["who", "who"], theme:'green'}});
    }

    function decrementCountBy2() {
        setCompleteState((prevState)=>{return {...prevState, count:count-1, pokemon: ["he", "he"], theme:'red'}});
    }


    return (
       <>
           <div className="ui grid container">
            <ProductComponent />
            <button onClick={incrementCount}>+</button>
            <div><h2>{count}</h2></div>
               <div>{pokemon}</div>
            <button onClick={decrementCountBy2}>-</button><br/>
               <span><h1>Total number of products: {products.length}</h1></span>
               <span><h1>Pokemons total: {pokemon}</h1></span>
           </div>
           <h2>{theme}</h2>
       </>
    )
}

export default ProductListing;