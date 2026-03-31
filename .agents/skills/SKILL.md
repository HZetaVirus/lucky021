Prompt Full-Stack (Appwrite + Angular) — Texto Corrido

Crie uma skill full-stack para um agente no Antigravity IDE que desenvolva um sistema web completo utilizando Appwrite como backend e Angular como frontend, com arquitetura modular, escalável e pronta para produção.

O sistema deve ser estruturado com separação clara entre frontend e backend, utilizando o Appwrite como BaaS (Backend as a Service), incluindo autenticação, banco de dados, storage e funções serverless.

No frontend, utilize Angular (última versão) com arquitetura baseada em módulos, componentes reutilizáveis, serviços para comunicação com o backend e gerenciamento de estado. Utilize boas práticas como lazy loading, separação de responsabilidades e organização por feature modules. O design deve ser responsivo, moderno e preparado para mobile-first, podendo usar Tailwind CSS ou Angular Material.

No backend, utilize Appwrite com as seguintes configurações: autenticação de usuários (email/senha e opcionalmente telefone), banco de dados estruturado em collections (ex: users, produtos, pedidos), regras de permissão seguras por usuário e por role, e uso de Appwrite Functions para lógica customizada, como processamento de pedidos, integrações externas e validações.

A skill deve implementar:

Sistema de autenticação completo (registro, login, logout, recuperação de senha).
Controle de acesso baseado em roles (ex: admin e usuário comum).
CRUD completo para entidades principais (ex: produtos, categorias, pedidos).
Integração do frontend Angular com Appwrite via SDK oficial.
Gerenciamento de estado no frontend usando serviços Angular (ou NgRx se necessário).
Upload de arquivos (imagens de produtos) utilizando Appwrite Storage.
Atualizações em tempo real (Realtime API do Appwrite) para eventos como novos pedidos.
Estrutura de API desacoplada usando Appwrite Functions para lógica crítica.

No frontend Angular:

Criar páginas: login, cadastro, dashboard, listagem de produtos, detalhes, carrinho (se aplicável), painel administrativo.
Criar componentes reutilizáveis: cards de produto, formulários, tabelas, modais.
Criar serviços para integração com Appwrite (AuthService, ProductService, OrderService).
Implementar guards de rota para proteger áreas autenticadas.
Implementar interceptors para tratamento de requisições e erros.

No Appwrite:

Criar collections:
users (dados adicionais do usuário)
produtos
categorias
pedidos
Configurar permissões (read/write) baseadas em usuário autenticado.
Criar functions para:
criação de pedidos
validação de dados
integrações externas futuras
Configurar triggers (eventos) para automações, como notificação de novo pedido.

Requisitos adicionais:

Código organizado e comentado.
Estrutura preparada para deploy em ambiente cloud.
Variáveis de ambiente para credenciais sensíveis.
Boas práticas de segurança (validação, autenticação, autorização).
Preparado para escalabilidade futura (multi-tenant se necessário).