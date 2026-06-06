import { IoClose } from "react-icons/io5";
import { PHRASES } from "../../constants/systemConstants";
import { SC_Menu } from "./styles";

const phrase = PHRASES[Math.floor(Math.random() * 20)];

const Index = ({ state, children, className, closeClick }) => {
  return (
    <SC_Menu className={`${state} ${className}`}>
      <button onClick={closeClick} type="button">
        <IoClose color="var(--cor-principal)" size={25} />
      </button>
      <div className="flex flex-column gap-16">
        <div>
          <span className="gap-5">
            <h1>
              ScRi<strong>tUS</strong>
            </h1>
          </span>
          <h4>{phrase}</h4>
        </div>
        {children}
      </div>
    </SC_Menu>
  );
};

export default Index;
