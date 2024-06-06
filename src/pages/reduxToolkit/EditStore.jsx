import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { postUpdateStore } from "../../redux/reducers/storeReducer";
import { useFormik } from "formik";
import * as Yup from "yup";

const wordRegExp =
  /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/;
const numberRegExp = /^(-?\d+(\.\d+)?).\s*(-?\d+(\.\d+)?)$/;

const EditStore = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { stores, isFetchStoreID } = useSelector((state) => state.stores);

  const storeParam = stores.find((a) => a.id == storeId);

  const [storeEdit, setStoreEdit] = useState(storeParam);

  useEffect(() => {
    if (!storeParam) {
      navigate(`/redux/stores`);
    }
  }, []);

  useEffect(() => {
    stores.map((item) => {
      if (Number(item.id) == Number(storeId)) {
        setStoreEdit(item);
      }
    });
  }, [isFetchStoreID]);

  const frmRegister = useFormik({
    initialValues: {
      name: storeEdit ? storeEdit.name : "",
      latitude: storeEdit ? storeEdit.latitude : "",
      longtitude: storeEdit ? storeEdit.longtitude : "",
      description: storeEdit ? storeEdit.description : "",
      image: storeEdit ? storeEdit.image : "",
    },
    onSubmit: (values) => {
      const storeResult = { ...values, id: storeId };
      dispatch(postUpdateStore(storeResult));
      navigate(`/redux/stores`);
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

  if (isFetchStoreID) return <div>loading...</div>;
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

export default EditStore;
