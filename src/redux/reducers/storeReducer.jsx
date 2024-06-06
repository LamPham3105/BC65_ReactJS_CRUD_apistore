import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getStores = createAsyncThunk(
  "stores/getStores",
  async (thunkAPI) => {
    const res = await axios.get(
      "https://apistore.cybersoft.edu.vn/api/Store/getAll"
    );
    return res.data.content;
  }
);

export const getStoreId = createAsyncThunk(
  "stores/getStoreId",
  async (storeId, { dispatch }) => {
    const res = await axios.get(
      `https://apistore.cybersoft.edu.vn/api/Store/getbyid?id=${storeId}`
    );

    return res.data.content;
  }
);

export const postAddStore = createAsyncThunk(
  "stores/postAddStore",
  async (store, { dispatch }) => {
    const res = await axios.post(
      "https://apistore.cybersoft.edu.vn/api/Store",
      store
    );
    return res.data;
  }
);

export const postUpdateStore = createAsyncThunk(
  "stores/postUpdateStore",
  async (store, { dispatch }) => {
    const res = await axios.put(
      `https://apistore.cybersoft.edu.vn/api/Store?id=${store.id}`,
      store
    );

    return res.data;
  }
);

export const postDeleteStore = createAsyncThunk(
  "stores/postDeleteStore",
  async (storeId, { dispatch }) => {
    const data = [Number(storeId)];
    const res = await axios.delete(
      "https://apistore.cybersoft.edu.vn/api/Store",
      { data }
    );
    return res.data;
  }
);

//setup state
const initialState = {
  loading: false,
  stores: [],
  isFetchStoreID: false,
  store: {},
};

const storeReducer = createSlice({
  name: "stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getStoreId.pending, (state) => {
        state.isFetchStoreID = true;
      })
      .addCase(getStoreId.fulfilled, (state, action) => {
        state.isFetchStoreID = false;
        state.store = action.payload;
      })
      .addCase(getStoreId.rejected, (state, action) => {
        state.isFetchStoreID = false;
      })
      .addCase(postAddStore.fulfilled, (state, action) => {
        state.stores.push(action.payload);
      })
      .addCase(postUpdateStore.fulfilled, (state, action) => {
        const index = state.stores.findIndex(
          (store) => store.id === action.payload.id
        );
        state.stores[index] = action.payload;
      })
      .addCase(postDeleteStore.fulfilled, (state, action) => {
        const index = state.stores.findIndex(
          (store) => Number(store.id) == Number(action.payload)
        );
        state.stores.splice(index, 1);
      });
  },
});

export default storeReducer.reducer;
