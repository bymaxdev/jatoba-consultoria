# Jatoba Consulting and Technology — site institucional

Site bilíngue (português `pt` e inglês `en`) com Next.js App Router, Tailwind CSS e [next-intl](https://next-intl.dev/).

## Requisitos

- Node.js 20+ (recomendado)
- npm

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000): o middleware redireciona `/` para `/pt` (locale por defeito).

- Home: `/pt` ou `/en`
- Política de privacidade: `/pt/privacy`, `/en/privacy`
- Termos de uso: `/pt/terms`, `/en/terms`

### Conteúdo e traduções

Textos estão em [`messages/pt.json`](messages/pt.json) e [`messages/en.json`](messages/en.json). Altere estes ficheiros para ajustar copy sem mudar componentes.

### Identidade visual

Cores e gradientes estão em [`app/globals.css`](app/globals.css). A logotipo em [`public/logo.png`](public/logo.png) usa **fundo transparente** (PNG). O script `node scripts/remove-logo-bg.mjs` gera `logo.png` a partir do ficheiro atual e grava `logo.backup.png` antes de processar.

## Formulário de contato (Resend)

A rota [`app/api/contact/route.ts`](app/api/contact/route.ts) valida o pedido com **Zod** e envia e-mail via **Resend**.

1. Criar conta na [Resend](https://resend.com/) e obter a API key.
2. Verificar o domínio (ou usar remetente de teste indicado na documentação da Resend).
3. Definir variáveis em `.env.local` (ver [`.env.example`](.env.example)):

   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` — destino das mensagens.
   - `CONTACT_FROM_EMAIL` — remetente verificado (formato recomendado: `Nome <email@dominio.com>`).

Se alguma destas variáveis faltar, a API devolve HTTP 503 e o utilizador vê mensagem de erro genérica na interface.

Campo honeypot `website`: se preenchido, o servidor aceita o pedido sem enviar e-mail (comportamento anti-bot simples).

## Build de produção

```bash
npm run build
npm start
```

## Deploy na Vercel

1. Ligar o repositório Git à Vercel.
2. Framework preset: Next.js (deteção automática).
3. Em **Environment Variables**, adicionar `RESEND_API_KEY`, `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL` para os ambientes **Production** (e opcionalmente **Preview**).
4. Deploy. Usar URLs de preview para revisão antes do domínio definitivo.

## Checklist antes do lançamento (cliente)

- [ ] Substituir textos legais em `privacy`/`terms` após revisão jurídica, se necessário.
- [ ] Confirmar `public/logo.png` em alta definição (fundo transparente).
- [ ] Configurar domínio customizado na Vercel e DNS (A/CNAME).
- [ ] Verificar envio real do formulário com `CONTACT_FROM_EMAIL` e domínio aprovados na Resend.
- [ ] Confirmar dados de contacto (e-mail, telefone, morada) no copy em `messages/*.json`.

## Licença

Uso proprietário para Jatoba Consulting and Technology salvo acordo em contrário.
