import Head from "next/head";
import { useRouter } from "next/router";

const Header = ({ headerTitle }) => {
  const location = useRouter();
  return (
    <Head>
      <title>{headerTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="keywords" conetnt="mochimap website" />

      <meta name="theme-color" content="#141414" />
      <meta name="msapplication-navbutton-color" content="#141414" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#141414" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      ></meta>

      <script type="text/javascript" src="/static/libs/jquery.js"></script>

      {/* <script
        defer
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>

      <script
        defer
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        integrity="sha512-dLxUelApnYxpLt6K2iomGngnHO83iUvZytA3YjDUCjT0HDOHKXnVYdf3hU4JjM8uEhxf9nD1/ey98U3t2vZ0qQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script> */}

      <script type="text/javascript" src="/static/Raw.js" defer></script>

      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v3.0.6/css/line.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
    </Head>
  );
};

export default Header;
