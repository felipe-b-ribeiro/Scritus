import { useState } from 'react';

function OpenEye() {
    return (
        // svg com icone
    );
}

function ClosedEye() {
    return (
        // svg com icone
    );
}

function EyeIcon() {
    const [aberto, setAberto] = useState(true);
    return (
        <button onClick={() => setAberto(!aberto)}>
            {aberto ? <OpenEye/> : <ClosedEye/>}
        </button>
    );
}

export default EyeIcon;