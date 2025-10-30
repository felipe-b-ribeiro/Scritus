const puxarDados = async (tipoUsuario, email) => {
        try {

            const body = {
                "tipoUsuario": tipoUsuario,
                "email": email
            }

            const usuario = fetch('http://localhost:5000/api/v1/usuarios/dados', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Autentication": "Bearer "
                },
                body: JSON.stringify(body)
            }
            );

            if (usuario.ok) {
                dados = usuario.json();

            } else {
                
            }

            }
        } 
        catch (err) {
            console.error('Erro ao puxar dados:', err);
        }

    }