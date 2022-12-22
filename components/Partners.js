import { Fragment, useEffect, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Zoom from "react-reveal/Zoom";
import { PartnersContext } from "../context/partnersContext";
import { Avatar, Card, Image } from "antd";
import axios from "axios";

const Partners = () => {
  const [partner, setPartner] = useContext(PartnersContext);
  const { partners } = partner;

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const { data } = await axios.get("/api/admin/partners");
      setPartner((prev) => ({ ...prev, partners: data }));
    } catch (err) {
      console.log("err==>", err);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Fragment>
      <div className="bg-gray-300 relative">
        <section className="px-12">
          <article>
            <h2 className="text-slate-800 font-bold text-3xl md:text-4xl text-center uppercase">
              Partners
            </h2>
          </article>

          <Carousel
            responsive={responsive}
            autoPlay={false}
            shouldResetAutoplay={false}
            ssr={true}
            infinite={true}
          >
            {partners.map((partner, i) => (
              <Zoom>
                <div
                  className=" max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 md:mx-5"
                  key={i}
                  style={{ maxHeight: "50%" }}
                >
                  <Image
                    shape="square"
                    style={{ height: "100px" }}
                    src={partner && partner.image && partner.image.url}
                    alt={partner.name}
                    layout="responsive"
                    preview={false}
                    priority
                  />
                </div>
              </Zoom>
            ))}
          </Carousel>
        </section>
      </div>
    </Fragment>
  );
};

export default Partners;
