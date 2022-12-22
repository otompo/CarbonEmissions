import { Layout } from "antd";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import AdminNav from "../nav/AdminNav";
import { useQuery } from "@tanstack/react-query";

const { Content } = Layout;

function AdminLayout({ children }) {
  const { isLoading, error, data } = useQuery(["admin"], () =>
    axios.get("/api/admin/current").then((res) => {
      return res.data;
    })
  );

  if (!data?.ok) {
    return <LoadingToRedirect />;
  }

  return (
    <Layout>
      <AdminNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
