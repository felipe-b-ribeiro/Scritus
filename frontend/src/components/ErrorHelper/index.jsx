import SC_ErrorHelper from "./styles";

const ErrorHelper = ({ text, className, onClick }) => {
  return (
    <SC_ErrorHelper role="dialog" className={className} onClick={onClick}>
      {text}
    </SC_ErrorHelper>
  );
};

export default ErrorHelper;
