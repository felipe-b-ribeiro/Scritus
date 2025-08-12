# Guia de Deploy do Scritus

## Deploy local (MVP)

1. Configure seu ambiente local com Node.js e PostgreSQL.  
2. Instale dependências do backend e frontend com `npm install`.  
3. Crie seu arquivo `.env` com as variáveis necessárias (exemplo no `.env.example`).  
4. Rode o backend com `npm run dev`.  
5. Rode o frontend com `npm start`.  
6. Acesse o sistema em `http://localhost:3000`.

---

## Deploy na AWS (planejamento futuro)

- Utilizar AWS EC2 para hospedar backend e frontend.  
- Usar S3 para armazenamento de capas e PDFs.  
- Configurar RDS para banco PostgreSQL gerenciado.  
- Automatizar deploy com CI/CD (GitHub Actions ou AWS CodePipeline).

---

## Considerações

- Inicialmente, o armazenamento será local para facilitar desenvolvimento.  
- Migração para AWS ocorrerá após conclusão do MVP.

