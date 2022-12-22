import { Fragment } from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";

const NotFoundPage = () => {
  return (
    <Layout title="404">
      <Fragment>
        <div className="page-not-found-wrapper mt-5 my-15">
          <h1 id="title_404">404!</h1>
          <h3 id="description_404">
            Page Not Found <br />
            Please go back to <Link href="/">Home</Link>{" "}
          </h3>
        </div>
      </Fragment>
    </Layout>
  );
};
export default NotFoundPage;
