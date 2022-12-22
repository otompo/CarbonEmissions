import Link from "next/link";
import {
  FacebookFilled,
  InstagramFilled,
  MailOutlined,
  PhoneFilled,
  SendOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";
import useFooter from "../hooks/useFooter";

export default function Footer() {
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
  } = useFooter();

  return (
    <div className="bg-neutral-900 py-10 lg:py-20 relative" id="footer">
      <footer className="px-10 max-width grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <ul className="">
          <h2 className="text-white text-3xl text-green-600">{addressTitle}</h2>
          {location && (
            <li className="my-4">
              <SendOutlined
                size={40}
                style={{ fontSize: 25, color: "#fff" }}
                className="text-white hover:text-green-700 hover:text-2sm"
              />
              <span className="text-white mx-2 mb-5 text-1xl">{location}</span>
            </li>
          )}
          {email && (
            <li className="my-4">
              <MailOutlined size={40} style={{ fontSize: 25, color: "#fff" }} />
              <span className="text-white mx-2 mb-5 text-1xl">
                <a href={`mailto:${email}`}>{email}</a>
              </span>
            </li>
          )}
          {contactNum && (
            <li className="my-4">
              <PhoneFilled
                size={40}
                style={{ fontSize: 25, color: "#fff" }}
                rotate={110}
              />
              <a href={`tel:${contactNum}`} style={{ color: "#000" }}>
                <span className="text-white mx-2 mb-5 text-1xl">
                  +{contactNum}
                </span>
              </a>
            </li>
          )}
        </ul>
        {quickLinkTitle && (
          <div>
            <h2 className="text-white text-3xl text-green-600">
              {quickLinkTitle}
            </h2>
            <ul className="">
              <Link href="/" className="text-white">
                <li className="my-3">Home</li>
              </Link>
            </ul>
          </div>
        )}

        <ul className="">
          {/* <li className="">
            
          </li> */}
          {/* 
          <li className="my-5">
            <DonateButton />
          </li> */}
        </ul>
        <ul className="">
          <div>
            <h6 className="text-white text-3xl text-green-600">
              {socialTitle}
            </h6>
          </div>
          {facebook && (
            <Link href={facebookLink} target="_blank">
              <li className="my-2">
                <FacebookFilled
                  size={40}
                  style={{ fontSize: 25 }}
                  className="hover:text-green-700 hover:text-2sm"
                />
                <span className="mx-2 mb-5 text-1xl  hover:text-green-700 hover:text-2sm">
                  {facebook}
                </span>
              </li>
            </Link>
          )}

          {twitter && (
            <Link href={twitterLink} target="_blank">
              <li className="my-2">
                <TwitterCircleFilled
                  size={40}
                  style={{ fontSize: 25 }}
                  className="hover:text-green-700 hover:text-2sm"
                />
                <span className="mx-2 mb-5 text-1xl  hover:text-green-700 hover:text-2sm">
                  {twitter}
                </span>
              </li>
            </Link>
          )}
          {instagram && (
            <Link href={instagramLink} target="_blank">
              <li className="my-2">
                <InstagramFilled
                  size={40}
                  style={{ fontSize: 25 }}
                  className="hover:text-green-700 hover:text-2sm"
                />
                <span className="mx-2 mb-5 text-1xl  hover:text-green-700 hover:text-2sm">
                  {instagram}
                </span>
              </li>
            </Link>
          )}
        </ul>
        <p></p>
      </footer>
      <div className="text-slate-200 text-center ml-5">
        Carbon Emissions Monitor © {new Date().getFullYear()} <br />
        <p className="text-center">
          Powered by{" "}
          <Link
            style={{ fontSize: 15 }}
            href="https://www.divinoitsolutions.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Divino IT Solutions
          </Link>
        </p>
      </div>
    </div>
  );
}
