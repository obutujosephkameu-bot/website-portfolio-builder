import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function RouteCanonical() {
  const { pathname } = useLocation();
  const url = `https://lumexdigital.co.ke${pathname}`;
  return (
    <Helmet>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}