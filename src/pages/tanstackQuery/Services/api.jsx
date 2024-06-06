import axios from "axios";

export class Api {
  async getStores() {
    const res = await axios.get(
      "https://apistore.cybersoft.edu.vn/api/Store/getAll"
    );

    return res.data.content;
  }

  async getStoreId(storeId) {
    const res = await axios.get(
      `https://apistore.cybersoft.edu.vn/api/Store/getbyid?id=${storeId}`
    );

    return res.data.content;
  }

  async postAddStore(store) {
    const res = await axios.post(
      "https://apistore.cybersoft.edu.vn/api/Store",
      store
    );
    return res.data;
  }

  async postUpdateStore(store) {
    const res = await axios.put(
      `https://apistore.cybersoft.edu.vn/api/Store?id=${store.id}`,
      store
    );

    return res.data;
  }

  async postDeleteStore(storeId) {
    const data = [Number(storeId)];
    const res = await axios.delete(
      "https://apistore.cybersoft.edu.vn/api/Store",
      { data }
    );
    return res.data;
  }
}

export const api = new Api();
