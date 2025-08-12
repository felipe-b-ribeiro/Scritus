# Backend — O cérebro por trás do Scritus

Imagine o backend como a cozinha de um restaurante:  
- Recebe os pedidos (requisições do frontend)  
- Prepara a comida (processa dados, roda regras)  
- Envia o prato pronto de volta (resposta para o usuário)

## O que tem aqui?

- `routes/` — O cardápio, que mostra o que dá pra pedir (rotas e endpoints).  
- `controllers/` — Os chefs que recebem o pedido e coordenam o preparo.  
- `models/` — A receita, que define como os ingredientes (dados) devem ser organizados no banco.  
- `middleware/` — Os garçons, que fazem a ponte entre a cozinha e o cliente, cuidando da ordem, da autenticação e resolvendo problemas.
- `uploads/` — Pasta onde ficam os uploads locais (temporária até migrar pro AWS)  
- `services/` — Técnicos especializados que fazem tarefas difíceis, como recomendações personalizadas.  
- `utils/` — Ferramentas diversas, tipo abridor de latas ou ralador, que ajudam em várias tarefas.  
- `config/` — O manual da cozinha: onde ficam as instruções essenciais para tudo funcionar (ex: conexão com o banco).

## Como rodar?

1. Configure seu arquivo (`.env`) com informações importantes (ex: onde fica o banco).  
2. Instale os ingredientes (dependências) com `npm install`.  
3. Ligue o forno: `npm run dev`.

