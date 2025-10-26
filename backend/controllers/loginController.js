import { authUserService } from '../services/authUserService.js'

export const authUser = async (req, res) => {

    try {

        const { email, senha } = req.body;

        if (!email || !senha) {
            throw new Error('Informações inválidas para autenticação.');
        }

        const token = await authUserService(email, senha);

        if (!token) return res.status(401).json({ erro: "Credenciais inválidas!"});

        res.status(200).json({token})

    } catch (err) {
        console.error("[LOGIN CONTROLLER ERROR]: ", err);
        res.status(500).json({error: err.message});
    }
    
}