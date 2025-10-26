import useNavigateCustom from '../../../hooks/useNavigateCustom.js'; 

const useHomeHook = () => {

    const { goTo } = useNavigateCustom();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        goTo('/');
    }

    return {
        handleLogout
    }
}

export default useHomeHook;