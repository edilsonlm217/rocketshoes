import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {MdRemoveCircleOutline, MdAddCircleOutline, MdDelete} from 'react-icons/md'
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  const cart = useSelector(state => {
    if (state.cart.length === 0) {
      return ({
        cart: state.cart,
        total: formatPrice(0),
      });
      
    } else {
      return ({
        cart: state.cart.map(product => ({
          ...product,
          sub_total: formatPrice(product.price * product.amount),
        })),
        total: 1234,
      });
    }
  });

  console.tron.log(cart);

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmount(product.id, product.amount + 1));
  }
  
  function decrement(product) {
    dispatch(CartActions.updateAmount(product.id, product.amount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { cart.cart.map(product => (
            <tr>
              <td>
                <img
                  src={product.image}
                  alt={product.title}
                />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1"/>
                  </button>
                  <input type="number" readOnly value={product.amount}/>
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1"/>
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.sub_total}</strong>
              </td>
              <td>
                <button type="button ">
                  <MdDelete size={20} onClick={() => dispatch(CartActions.removeFromCart(product.id))} color="7159c1"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{cart.total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
