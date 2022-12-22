import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import Chart from "../components/Chart";
import Partners from "../components/Partners";
import dynamic from "next/dynamic";
import About from "../components/About";
import absoluteUrl from "next-absolute-url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Index({ hero, logo, about }) {
  const { isLoading, error, data } = useQuery(["logo"], () =>
    axios.get("/api/website/logo/logo").then((res) => {
      return res.data;
    })
  );
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <>
          <Layout logo={logo}>
            <Home hero={hero} />
            <About about={about} />
            {/* <Map /> */}
            <Chart />
            <Partners />
          </Layout>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { origin } = absoluteUrl(req);
  const [dataOne, dataTwo, dataThree, dataFour] = await Promise.all([
    fetch(`${origin}/api/website/hero/hero`),
    fetch(`${origin}/api/website/logo/logo`),
    fetch(`${origin}/api/website/about/about`),
    // fetch(`${origin}/api/website/calltoaction/calltoaction`),
  ]);
  const [hero, logo, about, calltoaction] = await Promise.all([
    dataOne.json(),
    dataTwo.json(),
    dataThree.json(),
    // dataFour.json(),
  ]);

  return {
    props: {
      hero,
      logo,
      about,
      // calltoaction,
    },
  };
}
