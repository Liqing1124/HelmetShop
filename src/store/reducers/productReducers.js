import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_RESET
} from '../constants/productConstants';

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    
    case PRODUCT_SEARCH_REQUEST:
      return { ...state, loading: true };
    
    case PRODUCT_SEARCH_SUCCESS:
      return { loading: false, products: action.payload };
    
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { ...state, loadingReview: true };
    
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return {
        ...state,
        loadingReview: false,
        product: {
          ...state.product,
          reviews: [...state.product.reviews, action.payload]
        }
      };
    
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { ...state, loadingReview: false, errorReview: action.payload };
    
    case PRODUCT_REVIEW_CREATE_RESET:
      return { ...state, loadingReview: false, errorReview: null };
    
    default:
      return state;
  }
}; 