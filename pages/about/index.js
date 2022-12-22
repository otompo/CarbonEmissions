import { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Col, Row, Card } from "antd";
import Layout from "../../components/layout/Layout";
import TopTitle from "../../components/TopTitle";
import renderHTML from "react-render-html";
import Footer from "../../components/Footer";
function index(props) {
  return (
    <Layout title="About">
      <div className=" bg-white relative">
        <section className="contact">
          <TopTitle
            slogan={
              "We are innovative and provide advanced quality services and exclusive solutions."
            }
            welc={"About Us"}
          />
        </section>
        <section className="lg:py-32 sm:py-20 md:py-20 ">
          <Row>
            <Col
              // span={18} offset={4}

              xs={{ span: 20, offset: 2 }}
              xl={{ span: 18, offset: 4 }}
            >
              <p style={{ fontSize: 20 }}>{renderHTML(mainContent)}</p>
            </Col>
          </Row>
          <section className="max-width lg:py-32 ">
            <div className="md:grid grid-cols-2  gap-5 md:place-items-center mb-40 md:mb-28">
              <div className="bg-gray-300 text-center about-mission">
                <h1 className="text-slate-800 font-bold text-3xl">
                  {missionTitle}
                </h1>
              </div>
              <div>
                <p style={{ fontSize: 20 }}>{renderHTML(missionContent)}</p>
              </div>
            </div>
            <div className="md:grid grid-cols-2  gap-5 md:place-items-center mb-40 md:mb-28">
              <div className="bg-gray-300 text-center about-vision">
                <h1 className="text-slate-800 font-bold text-3xl">
                  {visionTitle}
                </h1>
              </div>
              <div>
                <p style={{ fontSize: 20 }}>{renderHTML(visionContent)}</p>
              </div>
            </div>
          </section>
        </section>
      </div>
      <Footer />
    </Layout>
  );
}

export default index;
