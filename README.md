# Mata da Nascente

Mapa 3D interativo de loteamento: abertura com a Terra, escolha entre cliente e corretor,
lotes com status em tempo real, simulador de pagamento, casas no lote e painel do corretor
(metas, comissão, anotações, equipe e condições de pagamento).

Site estático: não tem etapa de build. Abre em qualquer hospedagem de arquivos (Vercel, Netlify, etc.).

## Estrutura

| Arquivo | Para que serve |
|---|---|
| `index.html` | O site inteiro (estilo, mapa 3D, janela do lote, painel do corretor) |
| `config.js` | Chaves públicas (Cesium, Supabase), ponto de chegada e modelos GLB |
| `src/backend-supabase.js` | Banco de dados e login via Supabase |
| `src/intro-cesium.js` | Abertura com a Terra real via CesiumJS |
| `supabase/schema.sql` | Tabelas e regras de acesso do banco |
| `models/` | Casas em GLB (veja `models/LEIA-ME.md`) |
| `GUIA.md` | Passo a passo das contas e da publicação |

## Rodar localmente

```
npx serve .
```

Sem nada configurado, o site roda em **modo demonstração**: Terra desenhada por código,
login de corretor só pelo nome e dados salvos no navegador.
Cada serviço é ligado preenchendo o `config.js`, conforme o `GUIA.md`.
