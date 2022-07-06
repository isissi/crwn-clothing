import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss'

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>PRODUCT</span>
        </div>
        <div className='header-block'>
          <span>DESCRIPTION</span>
        </div>
        <div className='header-block'>
          <span>QUANTITY</span>
        </div>
        <div className='header-block'>
          <span>PRICE</span>
        </div>
        <div className='header-block'>
          <span>REMOVE</span>
        </div>
      </div>
        {
          cartItems.length ? 
          (cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          )))
          :
          (<h2 className='cart-empty-message'>Your cart is empty.</h2>)
        }
        <span className='total'>Total: ${cartTotal}</span>
    </div>
  )
}

export default Checkout;