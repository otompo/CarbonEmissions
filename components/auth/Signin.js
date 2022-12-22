import React, { useContext, useState, useEffect } from "react";
import { Card, Col, Row, Spin } from "antd";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/authContext";
import LoadingToRedirect from "../LoadingToRedirect";
import Layout from "../layout/Layout";
import { useRouter } from "next/router";
import axios from "axios";

function Signin(props) {
  const router = useRouter();
  const [auth, setAuth] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth?.token) {
      router.push("/admin");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save user and token to context
        setAuth(data);
        // save user and token to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Success");
        // redirect user
        if (data?.user?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        // form.resetFields();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  if (auth?.token) {
    return <LoadingToRedirect />;
  }

  return (
    <Layout title="Signin">
      <Row>
        <Col
          xl={{ span: 8, offset: 8 }}
          xs={{ span: 20, offset: 2 }}
          style={{ marginBottom: 220, paddingTop: "100px" }}
        >
          <Card>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <div className="d-grid gap-2">
                <button
                  disabled={!email || !password || loading}
                  className="btn btn-primary btn-block"
                  type="submit"
                >
                  {loading ? <Spin /> : "Login"}
                </button>
              </div>
            </form>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Signin;
