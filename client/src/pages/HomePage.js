
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row } from "antd";
import Layout from "./../components/Layout";
import TerrainList from "../components/TerrainList";
const HomePage = () => {
  const [terrains, setTerrains] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllTerrains",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setTerrains(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {terrains && terrains.map((terrain) => <TerrainList terrain={terrain} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;