import { useState, useEffect } from 'react';
import useNavigateCustom from '../../../hooks/useNavigateCustom.js'; 

const useHomeHook = () => {

    const [showOverlay, setShowOverlay] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        if (showOverlay) {
            document.body.style.overflow = "hidden";
        } 
        else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
        }, 
        [showOverlay]);


    const { goTo } = useNavigateCustom();

    const btnSair = () => {
        setShowOverlay(true);
        setShowLogoutModal(true);
    }

    const sairConfirm = () => {
        setShowOverlay(false);
        setShowLogoutModal(false);
        localStorage.removeItem('accessToken');
        goTo('/');
    }

    const sairCancel = () => {
        setShowLogoutModal(false);
        setShowOverlay(false);
    }

    return {
        btnSair,
        sairConfirm,
        sairCancel,
        showOverlay,
        showLogoutModal
    }
}

export default useHomeHook;