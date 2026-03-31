# 🎰 Lucky 021 — E-commerce & Backoffice

Plataforma completa de e-commerce desenvolvida com foco em alta performance, responsividade (Mobile-First) e uma identidade visual premium (Tema Cassino/Blackjack). O sistema adota uma arquitetura de Monorepo, contendo tanto a loja pública para os clientes quanto um painel administrativo seguro.

---

## 🏗️ Arquitetura do Projeto

O sistema é construído inteiramente sobre **Angular 17+ (Standalone Components)** e funciona sem backend customizado, dependendo unicamente do **Appwrite Cloud** como Backend-as-a-Service (BaaS) para autenticação, banco de dados (tempo real) e storage de imagens.

O repositório está estruturado como um workspace Angular contendo duas aplicações SPA distintas:

1. **`lucky021` (Storefront Pública)**: Catálogo de produtos, sistema de carrinho com persistência em sessão, e fluxo de checkout em 3 etapas (Endereço, Pagamento, Confirmação). Roda na porta `:4200`.
2. **`admin-loja` (Painel Administrativo)**: Área restrita (`adminGuard`) para o proprietário gerenciar controle de estoque, status de pedidos, clientes e upload de fotos. Roda na porta `:4201`.

---

## 💻 Stack Tecnológico

*   **Frontend**: Angular 17 (Standalone Components, Signals, Control Flow `@if`/`@for`).
*   **Estilização**: CSS Nativo (Vanilla CSS) com variáveis CSS e design responsivo fluido (Clamp).
*   **Backend/Banco de Dados**: [Appwrite](https://appwrite.io/) (Conta Auth, Databases, Storage Buckets).
*   **Gráficos**: Chart.js integrado via `ng2-charts`.
*   **Integrações Externas**: ViaCEP API (Auto-preenchimento de endereços no checkout).

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
*   Node.js (v18+)
*   Angular CLI (`npm install -g @angular/cli`)

### Instalação

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```

2. Configure as Variáveis de Ambiente. Certifique-se de que os arquivos `environment.ts` (em `src/environments/` e `projects/admin-loja/src/environments/`) apontam para suas credenciais reais do Appwrite:
   ```typescript
   export const environment = {
     production: false,
     appwriteUrl: 'https://cloud.appwrite.io/v1',
     appwriteProject: 'SEU_PROJECT_ID_AQUI',
     appwriteDatabaseId: 'lucky021_db',
     appwriteBucketId: 'produtos_bucket',
     viacepUrl: 'https://viacep.com.br/ws'
   };
   ```

3. Inicialize os Data Models no Appwrite. Caso tenha as credenciais administrativas e uma API Key (`node-appwrite`), rode o setup script na raiz do projeto:
   ```bash
   node setup-appwrite.js
   ```

### Execução Simultânea

Abra dois terminais na raiz do projeto:

Terminal 1 (Abre a Loja):
```bash
npm run start
# ou
ng serve lucky021
```

Terminal 2 (Abre o Painel Administrativo):
```bash
ng serve admin-loja --port 4201
```

---

## ☁️ Deploy na Vercel

Por ser uma arquitetura dividida, o repositório deve ser importado **duas vezes** no Vercel para gerar duas URLs independentes.

1.  **Deploy da Loja (`meusite.com`)**
    *   **Framework Preset:** Angular
    *   **Build Command:** `ng build lucky021`
    *   **Output Directory:** `dist/lucky021`

2.  **Deploy do Painel (`admin.meusite.com`)**
    *   **Framework Preset:** Angular
    *   **Build Command:** `ng build admin-loja`
    *   **Output Directory:** `dist/admin-loja`

---

## 🎨 Design System

O projeto inclui um sistema de design centralizado em `src/styles.css` altamente temático focado na conversão de vendas, utilizando:
*   Tipografia elegante: `Playfair Display` (Headings) e `Inter` (Body).
*   Paleta Dourada/Vermelha em contraste com o modo escuro extremo.
*   Target sizes amigáveis para toque celular (`min-height: 44px`).
*   Componentes customizados inspirados em naipes de cartas (♠ ♥ ♦ ♣) e fichas de cassino.

## 🔐 Estrutura de Rotas e Segurança

O controle de rotas conta com guards isolados usando injeção de dependências:
*   `guestGuard`: Impede que usuários logados retornem à tela de Login.
*   `authGuard`: Protege a área "Minha Conta" e a tela de Pagamento do Checkout.
*   `adminGuard`: Verifica se a propriedade `prefs.role === 'admin'` dentro da sessão segura gerada pelo Appwrite.

---
> Desenvolvido com foco na estética moderna e na escalabilidade de arquitetura distribuída.
