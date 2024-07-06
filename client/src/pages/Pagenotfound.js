import React from "react";
import Layout from "../components/layout/layout";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <a href="/" className="pnf-btn">
          Go Back
        </a>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
