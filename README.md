# Digital Hub Co-Creation Portal

Portal single-page desenvolvido para demonstrar boas práticas de front-end com foco em Angular, TypeScript e consumo de APIs REST, replicando um cenário realista do time digital da Digital Hub. A página apresenta o status das iniciativas co-criadas com clientes, métricas de operação e um espaço para feedbacks coletivos, reforçando pilares de colaboração e inovação.

## Cenário proposto
- **Contexto**: Squad híbrida em São Paulo apoiando clientes corporativos em jornadas de transformação digital.
- **Objetivo do produto**: Disponibilizar uma visão rápida das iniciativas, progresso, riscos e próximos marcos para facilitar ritos de acompanhamento.
- **Diferenciais evidenciados**: Consumo de dados (simulado) via serviço REST, componentização inspirada em Angular, UX responsiva, uso de TypeScript e organização orientada a projetos.

## Principais recursos
- Lista dinâmica de projetos com filtro por status e ordenação por saúde (score de risco).
- Métricas chave renderizadas a partir de dados externos (`metrics.json`).
- Destaque de próximos marcos e backlog imediato para apoiar priorização.
- Timeline de workflow com boas práticas da Digital Hub (Descoberta → Entrega → Evolução).
- CTA para agendar ritual de co-criação com o cliente.

## Tecnologias aplicadas
- HTML5 semântico.
- CSS3 com layout responsivo (Flexbox & Grid) e design system leve.
- JavaScript ES Modules gerado a partir de código TypeScript (`src/`).
- Estrutura inspirada em Angular (componentes, serviços, modelos) sem dependência de build complexo.

## Estrutura de pastas
```
.
├─ .vscode/                → Configurações do VS Code para o projeto
├─ public/
│  ├─ assets/
│  │  ├─ data/            → Mock de APIs (projects, metrics, team)
│  │  └─ images/          → Identidade visual e ilustrações
│  ├─ css/                → Folhas de estilo globais
│  └─ js/                 → Código compilado para o navegador (ESM)
├─ src/
│  └─ app/
│     ├─ components/      → Componentes TypeScript inspirados em Angular
│     ├─ models/          → Tipagens e contratos de dados
│     ├─ services/        → Serviços de consumo de dados REST
│     └─ utils/           → Utilidades compartilhadas
├─ index.html             → Entrada da aplicação (SPA leve)
├─ package.json           → Scripts npm e dependências (TypeScript)
├─ tsconfig.json          → Configuração do compilador TypeScript
└─ README.md              → Documentação do projeto
```

## Como executar
1. Instale as dependências e compile o TypeScript (opcional localmente, mas recomendado para manter paridade com o build):
   ```bash
   npm install
   npm run build
   ```
2. Sirva a aplicação em um servidor estático para que o `fetch` consiga acessar os arquivos JSON. Exemplos:
   ```bash
   npm run dev
   # ou
   npx serve .
   ```
   Também é possível utilizar extensões como **Live Server** no VS Code.

## Scripts npm disponíveis
- `npm run build` → compila os arquivos TypeScript de `src/` para `public/js`.
- `npm run dev`   → inicia um servidor estático simples usando `lite-server` (opcional).

## Próximos passos sugeridos
- Evoluir para um workspace Angular completo (`ng new`) aproveitando os módulos já sugeridos.
- Cobrir o serviço com testes unitários usando Jest + Testing Library.
- Conectar os serviços a uma API real (por exemplo, Azure Functions expostas para clientes Digital Hub).
- Integrar autenticação baseada em Azure AD para ambientes corporativos.

