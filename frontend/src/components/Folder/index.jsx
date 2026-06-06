import { useState } from "react";
import "./styles/Folder.css";
import { MdCloudUpload } from "react-icons/md";
import { TbCircleCheckFilled } from "react-icons/tb";
import styles from "./styles/pdfCheck.module.css";

const Folder = ({ size = 1, setPdf }) => {
  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const scaleStyle = { transform: `scale(${size})`, height: "fit-content" };

  return (
    <div style={scaleStyle} className="wrapper-folder">
      <button
        className={`folder ${open ? "open" : ""}`}
        onClick={toggleOpen}
        type="button"
      >
        <div className="folder__back">
            <label
              className="paper"
              htmlFor="pdf"
            >
              <span className='whitespace-nowrap'>PDF da Obra</span>
              <MdCloudUpload size={25} />
              <input
                id="pdf"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  setCorrect(true);
                  toggleOpen();
                  setPdf(e.target.files[0]);
                }}
              />
            </label>
          {correct && (
            <div className={styles.pdfCheckWrapper}>
              <div className={styles.pdfCheckBackground}></div>
              <TbCircleCheckFilled size={35} color="green" />
            </div>
          )}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </button>
    </div>
  );
};

export default Folder;
