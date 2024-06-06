import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useQuery,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../tanstackQuery/Services/api";

const wordRegExp =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
const numberRegExp = /^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/;

const EditStoreTanstack = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isPending } = useQuery({
    queryKey: ["stores"],
    queryFn: api.getStores,
    staleTime: 1 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationKey: ["addStore"],
    mutationFn: api.postUpdateStore,
    onSuccess: (res) => {
      queryClient.invalidateQueries("stores");
    },
  });

  const storeParam = data ? data.find((a) => a.id == storeId) : null;

  useEffect(() => {
    if (storeParam == null) {
      navigate(`/tanstack/stores`);
    }
  }, []);

  const frmRegister = useFormik({
    initialValues: {
      name: storeParam ? storeParam.name : "",
      latitude: storeParam ? storeParam.latitude : "",
      longtitude: storeParam ? storeParam.longtitude : "",
      description: storeParam ? storeParam.description : "",
      image: storeParam ? storeParam.image : "",
    },
    onSubmit: (values) => {
      const storeResult = { ...values, id: storeId };
      mutation.mutateAsync(storeResult);
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

  if (isLoading) return <div>loading...</div>;
  return (
    <form className="container" onSubmit={frmRegister.handleSubmit}>
      <h3>Create store</h3>
      <div className="w-75 mx-auto">
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            name="name"
            value={frmRegister.values.name}
            onInput={frmRegister.handleChange}
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
            value={frmRegister.values.latitude}
            onInput={frmRegister.handleChange}
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
            value={frmRegister.values.longtitude}
            onInput={frmRegister.handleChange}
          />
          {frmRegister.errors.longtitude && frmRegister.touched.longtitude && (
            <p style={{ color: "red" }}>{frmRegister.errors.longtitude}</p>
          )}
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            className="form-control"
            name="description"
            value={frmRegister.values.description}
            onInput={frmRegister.handleChange}
          />
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
            value={frmRegister.values.image}
            onInput={frmRegister.handleChange}
          />
          {frmRegister.errors.image && frmRegister.touched.image && (
            <p style={{ color: "red" }}>{frmRegister.errors.image}</p>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-dark mt-2" type="submit">
            Edit
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditStoreTanstack;
