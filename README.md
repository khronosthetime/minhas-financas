# Minhas Finanças

App de controle financeiro pessoal (PWA) para iPhone: gastos, orçamento e contas a pagar.

Todos os dados ficam salvos apenas no aparelho de quem usa (localStorage do navegador). Nada é enviado para a internet, e este repositório não contém nenhum dado pessoal.

## Como usar no iPhone

1. Abrir o endereço do app no Safari
2. Botão Compartilhar, depois "Adicionar à Tela de Início"
3. O app abre em tela cheia, com ícone próprio, e funciona offline

## Estrutura

- `index.html` app completo (interface, lógica e fontes embutidas)
- `manifest.webmanifest` configuração do PWA
- `sw.js` service worker (cache para uso offline)
- `icon-*.png` ícones do app

## Backup

Em Ajustes, o botão "Exportar backup" gera um arquivo `.json` com todos os lançamentos. Guarde de vez em quando para não perder os dados se trocar de aparelho.
