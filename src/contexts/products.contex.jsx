import { createContext, useState, useEffect} from "react";

import { getCategoriesAndDocumnets } from "../utils/firebase.utils";

export const ProductsContext = createContext({
  products: []
});

export const ProductsProvider = ({children}) => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocumnets();
      console.log(categoryMap);
    }

    getCategoriesMap();
  }, [])
  
  const value = {products};

  return (
    <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
  )
}