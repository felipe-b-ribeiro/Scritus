const usePerfilHook = async () => {

    const puxarDados = (email, tipoUsuario) => {
    try {
        const body = {
            "tipoUsuario": tipoUsuario,
            "email": email
        }
        const usuario = fetch('http://localhost:5000/api/v1/usuarios/puxardados', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        );
        if (usuario.ok) {
            return usuario.json();
        }
        }
    catch (err) {
        console.error('Erro ao puxar dados:', err);
    }

    return {
        puxarDados
    }

    }
}

export default usePerfilHook;