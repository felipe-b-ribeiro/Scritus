import SC_Overlay from "./styles";

const Overlay = ({ onClick, state }) => {
  return <SC_Overlay onClick={onClick} className={state} aria-hidden="true" />;
};

export default Overlay;
