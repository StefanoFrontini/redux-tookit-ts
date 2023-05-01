import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-project";

export interface Item {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
}
interface CartState {
  cartItems: Item[];
  isLoading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(url);
      // console.log(thunkAPI);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem && cartItem.amount++;
    },
    decrease: (state, { payload }: PayloadAction<string>) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem && cartItem.amount--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        // console.log(action);
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;

export default cartSlice.reducer;
