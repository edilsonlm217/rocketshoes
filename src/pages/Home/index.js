import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';


export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadAPI() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadAPI();
  }, []);

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img 
            src={product.image}
            alt={product.title}
          />
          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>
          <button type="button">
            <div>
              <MdShoppingCart size={16} color="#FFF"/> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
      
    </ProductList>
  );
}
