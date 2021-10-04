import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductComponent from "./ProductComponent";
import axios from "axios";
import {setProducts} from "../actions/productactions";
import PokemonList from "./PokemanList";
import Pagination from "./Pagination";

const ProductListing = () => {
    const products = useSelector((state) => state.allProducts.products);
    const dispatch = useDispatch();

    const [state, setCompleteState] = useState(()=>{
        console.log('----->>>>>>Arrow Function version of updating state calls only first time<<<<<<<-----');
        return {count:1, theme:'Orange', pokemon:["bulbasaur", "charmander"]};
    });

    const count = state.count;
    const theme = state.theme;

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [nextPageUrl, setNextPageUrl] = useState();

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

    const fetchPokemons = () => {
        return axios.get(currentPageUrl).then(resp => {
            setPrevPageUrl(resp.data.next);
            setNextPageUrl(resp.data.previous);
            setPokemon(resp.data.results.map(p => p.name));
            setLoading(false);
        })
    };


    useEffect(()=>{
        setLoading(true);
        fetchProducts();
    }, []);

    useEffect(()=>{
        setLoading(true);
        fetchPokemons();
        return ()=>{

        }
    }, [currentPageUrl]); //this is key to get the next and prev pages as the currenturl changes then only this useEffect will be called


    console.log("products: ", products);
    //understanding the state update with taking prev state and merging it(...prevState) with specific new fields update
    function incrementCount() {
        setCompleteState((prevState)=>{return {...prevState, count:count+1, pokemon: ["who", "who"], theme:'green'}});
    }

    function decrementCountBy2() {
        setCompleteState((prevState)=>{return {...prevState, count:count-1, pokemon: ["he", "he"], theme:'red'}});
    }


    function gotoNextPage() {
        setCurrentPageUrl(nextPageUrl);
    }

    function gotoPrevPage() {
        setCurrentPageUrl(prevPageUrl);
    }
    if(loading) return 'Loading....';
    return (
       <>
           <div>
               <PokemonList pokemon={pokemon}/>
               <Pagination
                   gotoNextPage ={nextPageUrl? gotoNextPage: null}
                   gotoPrevPage ={prevPageUrl? gotoPrevPage: null}
                   />
           </div>
           <div className="ui grid container">
            {/*<ProductComponent />*/}
            <button onClick={incrementCount}>+</button>
            <div><h2>{count}</h2></div>
            <button onClick={decrementCountBy2}>-</button><br/>
            <span><h1>Total number of products: {products.length}</h1></span>
               <h1>{pokemon.length-1}</h1>
           </div>
           <h2>{theme}</h2>
       </>
    )
};

export default ProductListing;