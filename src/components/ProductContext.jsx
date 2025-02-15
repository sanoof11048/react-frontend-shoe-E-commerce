import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
      setFilterProducts(res.data);
    });
  }, []);

  const toSearch=(searchValue)=>{
    console.log(searchValue)
    setFilterProducts(
          products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase().trim()))
        );
    
  }

  const filterByCategory = (category) => {
    setCategory(category);
    if (category === "All") {
      setFilterProducts(products);
    }  else{
      setFilterProducts(
        products.filter((product) => product.category === category)
      );
    }
  
  };

  return (
    <ProductContext.Provider
      value={{ products, filterProducts, category, filterByCategory, toSearch }}
    >
      {children}
    </ProductContext.Provider>
  );
};
