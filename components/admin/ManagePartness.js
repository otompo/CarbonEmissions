import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Modal, Avatar, Image } from "antd";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import toast from "react-hot-toast";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";

const { confirm } = Modal;

const ManagePartness = () => {
  const [values, setValues] = useState({
    name: "",
    loading: false,
  });
  const [success, setSuccess] = useState(false);
  const [partness, setPartness] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState(
    "Upload Partner Logo"
  );
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    showPartness();
  }, [success]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const showPartness = async () => {
    try {
      setValues({ ...values, loading: true });
      setLoading(true);
      const { data } = await axios.get(`/api/admin/partners`);
      setPartness(data);
      setValues({ ...values, loading: false });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      setSuccess(true);
      const { data } = await axios.post(`/api/admin/partners`, {
        ...values,
        image,
      });
      toast.success("Success");
      setValues({ ...values, name: "", loading: false });
      setImagePreview("");
      setSuccess(false);
      setIsModalVisible(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, name: "", loading: false });
      setSuccess(false);
    }
  };

  const handleImage = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setImage(reader.result);
      setUploadButtonText("Upload Partner Logo");
    }
  };

  const handleDelete = async (index) => {
    try {
      confirm({
        title: `Do you want to delete this  partner`,
        icon: <ExclamationCircleOutlined />,
        content: "It will be deleted permanentily if you click Yes",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          setValues({ ...values, loading: true });
          let allPartness = partness;
          const removed = allPartness.splice(index, 1);
          setPartness(allPartness);
          // send request to server
          const { data } = axios.delete(
            `/api/admin/partners/${removed[0]._id}`
          );
          toast.success("Deleted Successfully");
          setValues({ ...values, loading: false });
        },
        onCancel() {
          return;
        },
      });
    } catch (err) {
      toast.error(err);
      setValues({ ...values, loading: false });
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: "Image",
          field: "image",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },

        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    partness &&
      partness.forEach((partner, index) => {
        data.rows.push({
          image: (
            <Avatar
              size={100}
              src={
                <Image
                  src={partner && partner.image && partner.image.url}
                  preview={false}
                />
              }
            />
          ),
          name: `${partner && partner.name}`,

          action: (
            <>
              <div className="row">
                <div className="col-md-12">
                  <span onClick={() => handleDelete(index)}>
                    <DeleteOutlined
                      className="text-danger d-flex justify-content-center "
                      style={{ cursor: "pointer", fontSize: 25 }}
                    />
                  </span>
                </div>
              </div>
            </>
          ),
        });
      });

    return data;
  };

  return (
    <>
      <AdminLayout>
        <div className="container m-2">
          <div className="row">
            <div className="col-md-4">
              <h1 className="lead text-uppercase">Manage Partness</h1>
            </div>
            <div className="col-md-4 offset-md-2">
              <p
                className="btn text-white float-right btn-success text-uppercase"
                onClick={showModal}
              >
                {" "}
                Add New Partner
              </p>
            </div>
          </div>
        </div>
        <hr />

        <MDBDataTable
          data={setData()}
          className="px-3"
          bordered
          striped
          hover
        />
      </AdminLayout>

      <Modal
        title="Add Partner"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="form-control mb-4 p-2"
              placeholder="Enter organization name"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label
                  className="btn btn-dark btn-block text-left my-3 text-center"
                  style={{
                    width: imagePreview && imagePreview ? "150%" : "150%",
                  }}
                >
                  {uploadButtonText}
                  <input
                    type="file"
                    name="image"
                    size="large"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>
            </div>

            <div className="col-md-2 offset-2">
              <div className="form-group">
                {imagePreview ? (
                  <Avatar size={60} src={imagePreview} />
                ) : (
                  <Avatar size={60} src="/images/preview.ico" />
                )}
              </div>
            </div>
          </div>

          <div className="d-grid gap-2 my-2 ">
            <button
              className="btn btn-primary btn-block"
              disabled={!values.name}
              type="submit"
            >
              {values.loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManagePartness;
