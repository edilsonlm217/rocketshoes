import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        
        if (productIndex >= 0) {
          draft[productIndex].amout += 1;
        } else {
          draft.push({
            ...action.product, 
            amout: 1
          });
        }
      });

    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    default:
      return state;
  }
}