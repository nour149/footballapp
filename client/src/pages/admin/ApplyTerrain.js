import React from "react";
import Layout from "../../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import axios from "axios";

const ApplyTerrain = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/admin/apply-terrain",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.success);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };
  return (
    <Layout>
      <h1 className="text-center">Apply Terrain</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Terrain Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label=" Name"
              name="Name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder=" name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Taille"
              name="taille"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your taille" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="type_surface"
              name="type_surface"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your type_surface" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label=" équipements_disponibles"
              name=" équipements_disponibles"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder=" équipements_disponibles" />
            </Form.Item>
          </Col>
         
        
             <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" name="timings" required>
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
          </Row>
      </Form>
    </Layout>
  );
};

export default ApplyTerrain;