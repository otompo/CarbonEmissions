import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Footer from "../Footer";

const Layout = ({ children, title = "Sahel Green Tech Initiative" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Sahel Green Tech Initiative is a high standard home healthcare service that is located in Ghana, 
          west Africa providing home health services to Pastors and their wives and the general public at large"
        />
        <meta property="og:title" content="Carbon Emission" />
        <meta
          property="og:description"
          content="Sahel Green Tech Initiative is a high standard home healthcare service that is located in Ghana, 
          west Africa providing home health services to Pastors and their wives and the general public at large"
        />
        <meta property="og:site_name" content="Carbon Emission" />
        <meta
          property="og:image"
          content="https://carbonemission.com/images/default.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://carbonemission.com/img/default.png"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <script
          defer
          src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
          integrity="sha384-rOA1PnstxnOBLzCLMcre8ybwbTmemjzdNlILg8O7z1lUkLXozs4DHonlDtnE7fpc"
          crossOrigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
          crossorigin=""
        />
      </Head>

      {children}
      <Footer />
    </div>
  );
};
export default Layout;
