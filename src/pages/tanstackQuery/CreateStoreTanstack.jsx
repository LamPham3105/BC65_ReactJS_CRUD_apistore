import React from "react";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { api } from "../tanstackQuery/Services/api";
import * as Yup from "yup";

const wordRegExp =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
const numberRegExp = /^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/;

const CreateStoreTanstack = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["addStore"],
    mutationFn: api.postAddStore,
    onSuccess: (res) => {
      queryClient.invalidateQueries("stores");
    },
  });

  const frmRegister = useFormik({
    initialValues: {
      name: "",
      latitude: "",
      longtitude: "",
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      mutation.mutateAsync(values);
      navigate(`/tanstack/stores`);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .matches(wordRegExp, "Tên cửa hàng chỉ có thể là chữ!")
        .required("Vui lòng nhập tên cửa hàng"),
      latitude: Yup.string()
        .matches(numberRegExp, "Latitude chỉ có thể là số!")
        .required("Vui lòng nhập latitude"),
      longtitude: Yup.string()
        .matches(numberRegExp, "Longtitude chỉ có thể là số!")
        .required("Vui lòng nhập longtitude"),
      description: Yup.string().required("Vui lòng nhập mô tả"),
      image: Yup.string().required("Vui lòng nhập link hình"),
    }),
  });

  return (
    <form className="container" onSubmit={frmRegister.handleSubmit}>
      <h3>Create store</h3>
      <div className="w-75 mx-auto">
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            onChange={frmRegister.handleChange}
          />
          {frmRegister.errors.name && frmRegister.touched.name && (
            <p style={{ color: "red" }}>{frmRegister.errors.name}</p>
          )}
        </div>
        <div className="form-group">
          <label>Latitude</label>
          <input
            className="form-control"
            name="latitude"
            onChange={frmRegister.handleChange}
          />
          {frmRegister.errors.latitude && frmRegister.touched.latitude && (
            <p style={{ color: "red" }}>{frmRegister.errors.latitude}</p>
          )}
        </div>
        <div className="form-group">
          <label>Longtitude</label>
          <input
            className="form-control"
            name="longtitude"
            onChange={frmRegister.handleChange}
          />{" "}
          {frmRegister.errors.longtitude && frmRegister.touched.longtitude && (
            <p style={{ color: "red" }}>{frmRegister.errors.longtitude}</p>
          )}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            className="form-control"
            name="description"
            onChange={frmRegister.handleChange}
          />{" "}
          {frmRegister.errors.description &&
            frmRegister.touched.description && (
              <p style={{ color: "red" }}>{frmRegister.errors.description}</p>
            )}
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            className="form-control"
            name="image"
            onChange={frmRegister.handleChange}
          />
          {frmRegister.errors.image && frmRegister.touched.image && (
            <p style={{ color: "red" }}>{frmRegister.errors.image}</p>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-dark mt-2" type="submit">
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateStoreTanstack;
