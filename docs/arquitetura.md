# Arquitetura do Scritus

## Visão geral

O Scritus é dividido em 3 camadas principais:

1. **Frontend** — Interface React.js onde usuários interagem com o sistema.  
2. **Backend** — Servidor Node.js que processa requisições, lógica e dados.  
3. **Machine Learning** — Módulo Python responsável por adaptar recomendações baseadas no comportamento do usuário.

## Comunicação

- Frontend se comunica com Backend via API REST.  
- Backend integra o modelo ML para fornecer recomendações personalizadas.  
- Dados persistidos no banco PostgreSQL local (MVP).

## Estrutura de pastas (resumo)

- `frontend/` — Código e recursos da interface.  
- `backend/` — Lógica, rotas, modelos, serviços.  
- `ml/` — Dados, notebooks, modelos e scripts ML.  
- `docs/` — Documentação do projeto.

---

## Fluxo de dados básico

Usuário → Frontend → Backend → Banco de Dados  
                    ↘ ML para recomendações  
