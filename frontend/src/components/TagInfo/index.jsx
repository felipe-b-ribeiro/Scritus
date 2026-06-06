import { SC_TagInfo } from "./styles";

const Index = ({ text, variant }) => {
  return <SC_TagInfo className={variant}>{text}</SC_TagInfo>;
};

export default Index;
