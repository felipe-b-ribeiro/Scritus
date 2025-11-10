import { useState } from 'react';
import './Folder.css';
import UploadIcon from '../icons/uploadIcon';
import CorrectIcon from '../icons/correctIcon';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({ color = '#5227FF', size = 1 , setPdf, pdf}) => {
  const [open, setOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const [correct, setCorrect] = useState(false);

  const folderBackColor = darkenColor(color, 0.08);
  const paperColor = darkenColor('#ffffff', 0.1);

  const handleClick = () => setOpen(prev => !prev);

  const handleMouseMove = (e) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    setOffsetY((e.clientY - centerY) * 0.15); // só vertical
  };

  const handleMouseLeave = () => setOffsetY(0);

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-3': paperColor
  };

  const scaleStyle = { transform: `scale(${size})`, height: 'fit-content' };

  return (
    <>
      <div style={scaleStyle} className="wrapper-folder">
        <div className={`folder ${open ? 'open' : ''}`} style={folderStyle} onClick={handleClick}>
          <div className="folder__back">
            {/* Papers 1 e 2 invisíveis */}
            <div className="paper paper-1" style={{ display: 'none' }}></div>
            <div className="paper paper-2" style={{ display: 'none' }}></div>

            {/* Paper 3 visível */}
              <label htmlFor="pdf">
                <div
                  className="paper paper-3"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '10px',
                    bottom: '20px',
                    fontSize: '0.6em',
                    ...(open ? { '--magnet-x': `0px`, '--magnet-y': `${offsetY}px` } : {})
                  }}>
                  <span style={{whiteSpace: 'nowrap'}} >PDF da Obra</span>
                  <UploadIcon />
                  <input id='pdf' type="file" accept='.pdf' style={{display: 'none'}} onChange={(e) => {setCorrect(true); setPdf(e.target.files[0]);}}/>
                </div>
              </label>
                { correct && <div style={{position: 'absolute', zIndex: '4', right: '-10px', bottom: '-13px'}}><CorrectIcon /></div> }
            <div className="folder__front"></div>
            <div className="folder__front right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Folder;
