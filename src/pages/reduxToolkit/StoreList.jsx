import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Popconfirm } from "antd";
import { getStores, postDeleteStore } from "../../redux/reducers/storeReducer";

const StoreList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stores, loading } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(getStores());
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Alias",
      dataIndex: "alias",
      key: "alias",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img
          src={`${text.replace(
            "https://apistore.cybersoft.edu.vn/images/",
            ""
          )}`}
          class="img-fluid"
          alt="..."
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (record) => (
        <Space size="small">
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
          <button
            className="btn btn-success"
            onClick={() => handleEdit(record)}
          >
            Edit
          </button>
        </Space>
      ),
    },
  ];

  const handleDelete = (itemId) => {
    dispatch(postDeleteStore(itemId));
    navigate(`/redux/stores`);
  };

  const handleEdit = (item) => {
    navigate(`/redux/store-detail/${item.id}`);
  };

  let storeListResult = stores.map((store, index) => {
    return {
      ...store,
      key: index,
    };
  });

  if (loading) return <div>Loading...</div>;
  else
    return (
      <div className="container">
        <h3>Store list</h3>
        <Table
          columns={columns}
          loading={loading}
          dataSource={storeListResult}
        />
      </div>
    );
};

export default StoreList;
