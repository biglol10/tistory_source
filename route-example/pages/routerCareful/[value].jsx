import { useRouter } from "next/router";
import { Layout1 } from "@components/index";
import { useEffect } from "react";

const RouterCareful = ({ queryObj = {} }) => {
  const router = useRouter();

  const { value } = router.query;

  useEffect(() => {
    console.log(`useRouter value is ${value}`);
    console.log(`getServerSideProps value is ${queryObj.value}`);
  }, []);

  return (
    <>
      <div style={{ borderColor: "red" }}>
        This is the value from dynamic route = {value}
      </div>

      <br />

      <div style={{ borderColor: "blue" }}>
        This is the value from ServerSideRendering = {queryObj.value}
      </div>
    </>
  );
};

RouterCareful.Layout = Layout1;

export const getServerSideProps = async (context) => {
  return { props: { queryObj: context.query } };
};

export default RouterCareful;
