import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button, Space, Popconfirm } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../tanstackQuery/Services/api";

const StoreListTanstack = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isPending } = useQuery({
    queryKey: ["stores"],
    queryFn: api.getStores,
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationKey: ["deleteStore"],
    mutationFn: api.postDeleteStore,
    onSuccess: (res) => {
      queryClient.invalidateQueries("stores");
    },
  });

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
    mutation.mutateAsync(itemId);
    navigate(`/tanstack/stores`);
  };

  const handleEdit = (item) => {
    navigate(`/tanstack/store-detail/${item.id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  else
    return (
      <div className="container">
        <h3>Store list</h3>
        <Table columns={columns} loading={isLoading} dataSource={data} />
      </div>
    );
};

export default StoreListTanstack;
