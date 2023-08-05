import React from "react";
import { useNavigate } from "react-router-dom";

const TerrainList = ({ terrain }) => {
    const navigate = useNavigate();
  return (
    <>
       <div
        className="card m-2"
          style={{ cursor: "pointer" }}
        onClick={() => navigate(`/terrain/book-appointment/${terrain._id}`)}
      >
        <div className="card-header">
         {terrain.Name} {terrain.taille}
        </div>
        <div className="card-body">
          <p>
            <b>  type_surface</b> {terrain.type_surface}
          </p>
         
          <p>
            <b> équipements_disponibles</b> {terrain. équipements_disponibles}
          </p>
          <p>
            <b>Timings</b> {terrain.timings[0]} - {terrain.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default TerrainList;