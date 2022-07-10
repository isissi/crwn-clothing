import { createContext, useState, useEffect, useReducer } from 'react';

const addCartItem = (cartItems, productsToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productsToAdd.id); 

  //increment quantity if the product is found in cart
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === productsToAdd.id ? 
      {...cartItem, quantity: cartItem.quantity + 1 } 
      : cartItem
    );
  }
  return [...cartItems, { ...productsToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id); 

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }
  
  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? 
    {...cartItem, quantity: cartItem.quantity - 1 } 
    : cartItem
  );
}

const emptyCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS', 
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [], 
  addItemToCart: () => {}, 
  removeItemFromCart: () => {},
  emtpyItemFromCart: () => {}, 
  cartItemCount: 0, 
  cartTotal: 0
});

const INITIAL_STATE =  {
  isCartOpen: false,
  cartItems: [], 
  cartItemCount: 0, 
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const {type, payload } =action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS: 
      return {
        ...state, 
        ...payload
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
      return {
        ...state, 
        isCartOpen: payload
      }
    default: 
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const [{cartItems, isCartOpen, cartItemCount,cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);



  const upateCartItemsReducer = (newCartItems) => {
    const newCarCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0); 
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0); 

    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCarCount}})
  }

  const addItemToCart = (productsToAdd) => {
    const newCartItems = addCartItem(cartItems, productsToAdd);
    upateCartItemsReducer(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    upateCartItemsReducer(newCartItems);
  }

  const emtpyItemFromCart = (cartItemToRemove) => {
    const newCartItems = emptyCartItem(cartItems, cartItemToRemove);
    upateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, emtpyItemFromCart, cartItems, cartItemCount, cartTotal };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
};