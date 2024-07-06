import React from "react";
import Layout from "../components/layout/layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce App"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/aboutus.jpg"
            alt="contactus"
            style={{ width: "50%", height: "70%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            magni sapiente optio sit accusantium nesciunt reprehenderit omnis
            similique officia! Suscipit ut dignissimos impedit culpa minima,
            sunt, voluptates facere ratione labore obcaecati accusamus qui
            voluptatum iste et quisquam, ipsam animi fuga deserunt. Cumque
            doloremque est facilis!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
