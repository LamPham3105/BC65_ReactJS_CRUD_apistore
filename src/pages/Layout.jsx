import React from "react";
import { useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container d-lg-flex justify-content-around">
        <div className="row">
          <div className="col-6">
            <a
              onClick={() => {
                navigate(`/redux/stores`);
              }}
            >
              <div className="img-card text-center">
                <img
                  src="data:image/png;base64,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"
                  alt="redux"
                  className="img-fluid"
                />
                <h1 className="lineSpace" style={{ marginTop: 93 }}>
                  Redux
                </h1>
              </div>
            </a>
          </div>
          <div className="col-6">
            <a
              onClick={() => {
                navigate(`/tanstack/stores`);
              }}
            >
              <div className="img-card text-center">
                <img
                  src="https://pbs.twimg.com/profile_images/1750416900306440192/m_Vw7t19_400x400.jpg"
                  alt="tanstack"
                  className="img-fluid"
                />
                <h1 className="lineSpace">Tanstack</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
