import React, { useState } from "react";
import { Tabs, Row, Col, Button, Input, Card, Avatar } from "antd";
import AdminLayout from "../layout/AdminLayout";
import { Editor } from "@tinymce/tinymce-react";
import useAbout from "../../hooks/useAbout";
import useFooter from "../../hooks/useFooter";
import useHero from "../../hooks/useHero";
import toast from "react-hot-toast";
import axios from "axios";
import useLogo from "../../hooks/useLogo";

const { TabPane } = Tabs;

function ManageSettings(props) {
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [loadingAbout, setLoadingAbout] = useState(false);
  const [logoImagePreview, setLogoImagePreview] = useState("");
  const [success, setSuccess] = useState(false);
  const [fullImagePreview, setFullImagePreview] = useState("");
  const [fullUploadButtonText, setFullUploadButtonText] =
    useState("Upload Full Image");

  const { logoImage, setLogoImage } = useLogo();
  const {
    mainTitle,
    mainContent,
    missionTitle,
    missionContent,
    visionTitle,
    visionContent,
    setMainTitle,
    setMainContent,
    setMissionTitle,
    setMissionContent,
    setVisionTitle,
    setVisionContent,
  } = useAbout();

  const {
    title,
    content,
    fullwithImage,
    setContent,
    setTitle,
    setFullwithImage,
  } = useHero();

  const {
    addressTitle,
    location,
    email,
    contactNum,
    quickLinkTitle,
    socialTitle,
    facebook,
    twitter,
    instagram,
    facebookLink,
    twitterLink,
    instagramLink,
    setAddressTitle,
    setLocation,
    setEmail,
    setContactNum,
    setQuickLinkTitle,
    setSocialTitle,
    setFacebook,
    setTwitter,
    setInstagram,
    setFacebookLink,
    setTwitterLink,
    setInstagramLink,
  } = useFooter();

  const handleAboutSubmit = async () => {
    try {
      setLoadingAbout(true);
      const { data } = await axios.post("/api/website/about", {
        about: "about",
        title: mainTitle,
        mainContent,
        missionTitle,
        missionContent,
        visionTitle,
        visionContent,
      });
      toast.success("Saved");
      setLoadingAbout(false);
    } catch (err) {
      console.log(err);
      setLoadingAbout(false);
    }
  };

  const handleHeroSubmit = async () => {
    try {
      setSuccess(true);

      const { data } = await axios.post("/api/website/hero", {
        hero: "hero",
        title,
        content,
        fullwithImage,
      });
      toast.success("Saved");
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const handleLogoSubmit = async () => {
    try {
      setSuccess(true);
      setLoadingLogo(true);
      const { data } = await axios.post("/api/website/logo", {
        logo: "logo",
        logoImage,
      });
      toast.success("Saved");
      setSuccess(false);
      setLoadingLogo(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setLoadingLogo(false);
    }
  };

  const handleLogoImage = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      // setUploadButtonText(reader.name);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogoImage(reader.result);
          setLogoImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setFullUploadButtonText("Upload  Image");
      setLogoImagePreview("Upload  Image");
    }
  };

  const handleFooterSubmit = async () => {
    try {
      // setSuccess(true);
      const { data } = await axios.post("/api/website/footer", {
        footer: "footer",
        addressTitle,
        location,
        email,
        contactNum,
        quickLinkTitle,
        socialTitle,
        facebook,
        twitter,
        instagram,
        facebookLink,
        twitterLink,
        instagramLink,
      });
      toast.success("Saved");
      // setSuccess(false);
    } catch (err) {
      console.log(err);
      // setSuccess(false);
    }
  };

  const handleFullImage = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();
      // setUploadButtonText(reader.name);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setFullwithImage(reader.result);
          setFullImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setFullUploadButtonText("Upload Full Image");
      setFullImagePreview("Upload Full Image");
    }
  };

  const handleMissionContent = (e) => {
    setMissionContent(e);
  };

  const handleVisionContent = (e) => {
    setVisionContent(e);
  };

  const handleMainContent = (e) => {
    setMainContent(e);
  };
  const handleHeroContent = (e) => {
    setContent(e);
  };

  return (
    <AdminLayout>
      <div className="container-fluid m-2">
        <div className="row my-3">
          <div className="col-md-3">
            <h1 className="lead text-uppercase">Manage Settings</h1>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Tabs
              defaultActiveKey="1"
              // onChange={onChange}
              style={{ width: "180%", marginRight: 50 }}
            >
              <TabPane tab="CUSTOMIZE HERO SECTION" key="1">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <Card
                        cover={
                          <Avatar
                            shape="square"
                            style={{ height: "170px" }}
                            src={fullwithImage}
                            alt={title}
                          />
                        }
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label
                                className="btn btn-dark btn-block text-left my-3 text-center"
                                style={{
                                  width:
                                    fullImagePreview && fullImagePreview
                                      ? "120%"
                                      : "120%",
                                }}
                              >
                                {fullUploadButtonText}
                                <input
                                  type="file"
                                  name="image"
                                  size="large"
                                  onChange={handleFullImage}
                                  accept="image/*"
                                  hidden
                                />
                              </label>
                            </div>
                          </div>

                          <div className="col-md-2 offset-2">
                            <div className="form-group">
                              {fullImagePreview ? (
                                <Avatar size={60} src={fullImagePreview} />
                              ) : (
                                <Avatar size={60} src="/images/preview.ico" />
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Input
                        style={{ margin: "20px 0px 10px 0px" }}
                        size="large"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Editor
                        apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                        init={{
                          height: 200,
                          menubar: true,
                          selector: "textarea", // change this value according to your HTML
                          images_upload_url: "postAcceptor.php",
                          automatic_uploads: false,
                          images_reuse_filename: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],

                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onEditorChange={handleHeroContent}
                        name="content"
                        value={content}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Button
                        className="btn btn-primary btn-block"
                        onClick={handleHeroSubmit}
                        type="primary"
                        style={{ margin: "10px 0px 10px 0px" }}
                        loading={success}
                        block
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="CUSTOMIZE ABOUT US" key="2">
                <Row style={{ marginRight: 50 }}>
                  <Col
                    span={12}
                    offset={4}
                    // style={{ marginRight: 5 }}
                  >
                    <Input
                      // style={{ margin: "20px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter title"
                      value={mainTitle}
                      onChange={(e) => setMainTitle(e.target.value)}
                    />
                  </Col>
                  <Col span={9} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "20px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter mission title"
                      value={missionTitle}
                      onChange={(e) => setMissionTitle(e.target.value)}
                    />
                  </Col>
                  <Col span={9}>
                    <Input
                      style={{ margin: "20px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter vision title"
                      value={visionTitle}
                      onChange={(e) => setVisionTitle(e.target.value)}
                    />
                  </Col>
                  <Col span={9} style={{ marginRight: 5 }}>
                    <Editor
                      apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                      init={{
                        height: 200,
                        menubar: true,
                        selector: "textarea", // change this value according to your HTML
                        images_upload_url: "postAcceptor.php",
                        automatic_uploads: false,
                        images_reuse_filename: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],

                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onEditorChange={handleMissionContent}
                      name="missionContent"
                      value={missionContent}
                    />
                  </Col>
                  <Col span={9}>
                    <Editor
                      apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                      init={{
                        height: 200,
                        menubar: true,
                        selector: "textarea", // change this value according to your HTML
                        images_upload_url: "postAcceptor.php",
                        automatic_uploads: false,
                        images_reuse_filename: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],

                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onEditorChange={handleVisionContent}
                      name="visionContent"
                      value={visionContent}
                    />
                  </Col>
                  <Col span={18} style={{ marginTop: 10 }}>
                    <Editor
                      apiKey="nti1dzmlp7xe935k4cysx2rcp0zxrnsva5pc01n76kx1j9xh"
                      init={{
                        height: 300,
                        menubar: true,
                        selector: "textarea", // change this value according to your HTML
                        images_upload_url: "postAcceptor.php",
                        automatic_uploads: false,
                        images_reuse_filename: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],

                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onEditorChange={handleMainContent}
                      name="mainContent"
                      value={mainContent}
                    />
                  </Col>
                  <Col span={18}>
                    <Button
                      className="btn btn-primary btn-block"
                      onClick={handleAboutSubmit}
                      type="primary"
                      style={{ margin: "10px 0px 10px 0px" }}
                      loading={loadingAbout}
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="CUSTOMIZE LOGO" key="6">
                <div className="row">
                  <div className="col-md-6">
                    <Card
                      cover={
                        <Avatar
                          shape="square"
                          style={{ height: "170px" }}
                          src={logoImage}
                          alt="logo"
                        />
                      }
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label
                              className="btn btn-dark btn-block text-left my-3 text-center"
                              style={{
                                width:
                                  logoImagePreview && logoImagePreview
                                    ? "130%"
                                    : "130%",
                              }}
                            >
                              {fullUploadButtonText}
                              <input
                                type="file"
                                name="image"
                                size="large"
                                onChange={handleLogoImage}
                                accept="image/*"
                                hidden
                              />
                            </label>
                          </div>
                        </div>

                        <div className="col-md-2 offset-2">
                          <div className="form-group">
                            {logoImagePreview ? (
                              <Avatar size={60} src={logoImagePreview} />
                            ) : (
                              <Avatar size={60} src="/images/preview.ico" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Button
                      className="btn btn-primary btn-block"
                      onClick={handleLogoSubmit}
                      type="primary"
                      style={{ margin: "10px 0px 10px 0px" }}
                      loading={loadingLogo}
                      block
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="CUSTOMIZE FOOTER" key="5">
                <Row>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter address title"
                      value={addressTitle}
                      onChange={(e) => setAddressTitle(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter buttom text"
                      value={contactNum}
                      onChange={(e) => setContactNum(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter quick links itle"
                      value={quickLinkTitle}
                      onChange={(e) => setQuickLinkTitle(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter social title"
                      value={socialTitle}
                      onChange={(e) => setSocialTitle(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter facebook"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter facebook link"
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter twitter"
                      value={twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter twitter link"
                      value={twitterLink}
                      onChange={(e) => setTwitterLink(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter instagram title"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2} style={{ marginRight: 5 }}>
                    <Input
                      style={{ margin: "10px 0px 10px 0px" }}
                      size="large"
                      placeholder="Enter  instagram link"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                    />
                  </Col>
                  <Col span={14} offset={2}>
                    <Button
                      className="btn btn-primary btn-block"
                      onClick={handleFooterSubmit}
                      type="primary"
                      style={{ margin: "10px 0px 10px 0px" }}
                      // loading={ok}
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageSettings;
