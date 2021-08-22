import Router from "next/router";
import { useEffect } from "react";
import Loading from "./components/Loading";

export default function Home() {
  useEffect(() => {
    Router.replace(`/direct/welcome`);
  }, []);
  return <Loading />;
}
