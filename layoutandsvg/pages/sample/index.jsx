import { Layout1 } from "../../components";
import SvgComp from "../../styles/sample.svg";

const Index = () => {
  return (
    <>
      <div>
        <h1>This is a sample page for different Layout</h1>
        <SvgComp />
      </div>
    </>
  );
};

Index.Layout = Layout1;

export default Index;
