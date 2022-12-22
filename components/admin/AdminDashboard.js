import AdminLayout from "../layout/AdminLayout";
import CountTo from "react-count-to";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function AdminDashboard(props) {
  const { isLoading, error, data } = useQuery(["numbers"], () =>
    axios.get("/api/admin/numbers").then((res) => {
      return res.data;
    })
  );

  return (
    <AdminLayout>
      <main className="bg-white-300 flex-1 p-3 overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
            <div className="shadow bg-green-800 border-l-8 hover:bg-green-700 border-green-700 mb-2 p-2 md:w-1/4 mx-2">
              <Link href="/admin/staff">
                <div className="p-4 flex flex-col">
                  <p className="no-underline text-white text-2xl mb-4">
                    {isLoading ? (
                      ""
                    ) : (
                      <CountTo to={data.staff} speed={data.staff * 100} />
                    )}
                  </p>
                  <p className="no-underline text-white text-lg">Total Staff</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}

export default AdminDashboard;
