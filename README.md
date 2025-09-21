# IBGE Dashboard

Dashboard para visualização de dados econômicos do IBGE, desenvolvido com React.js e Next.js.

## 🚀 Tecnologias

- **React.js 18** - Biblioteca principal com hooks e Context API
- **Next.js 14** - Framework para roteamento e build
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/ui** - Componentes de interface
- **Recharts** - Gráficos interativos
- **Context API + useReducer** - Gerenciamento de estado global
- **Custom Hooks** - Lógica de negócio encapsulada

## 📊 Funcionalidades

### 📈 **IPCA - Inflação**
- **Dados de 2019**: Análise completa do ano
- **Filtros Interativos**: Por mês e grupo de produtos
- **Visualizações**: Cards com variações, gráfico de evolução, tabela detalhada
- **Grupos**: Alimentação, Habitação, Transportes, Saúde, Educação, etc.

### 📊 **Indicadores Econômicos**
- **9 Indicadores**: IR, PC, IA, IQ, LA, PZ, MC, SC, SI
- **Cards Detalhados**: Informações sobre cada indicador
- **Agregados**: Séries de dados específicas
- **Categorização**: Por tipo de pesquisa

## 📁 Estrutura do Projeto

```
├── app/                    # Páginas Next.js
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página principal
├── contexts/              # Context API
│   └── app-context.tsx    # Estado global
├── hooks/                 # Custom Hooks
│   └── use-ibge-data.ts   # Hooks para dados IBGE
├── components/            # Componentes React
│   ├── ui/               # Componentes reutilizáveis
│   │   ├── loading.tsx   # Estados de carregamento
│   │   ├── error.tsx     # Tratamento de erros
│   │   ├── cards.tsx     # Cards especializados
│   │   └── filters.tsx   # Sistema de filtros
│   ├── pages/            # Páginas específicas
│   │   ├── home-page.tsx
│   │   ├── ipca-page.tsx
│   │   └── economic-indicators-page.tsx
│   ├── dashboard.tsx     # Componente principal
│   ├── sidebar.tsx       # Navegação
│   ├── data-table.tsx    # Tabela de dados
│   └── ipca-chart.tsx    # Gráfico IPCA
└── lib/                  # Utilitários
    ├── ibge-api.ts       # APIs do IBGE
    └── utils.ts          # Funções utilitárias
```

## 🔗 APIs Utilizadas

### **IBGE SIDRA**
- **URL**: `https://apisidra.ibge.gov.br/values/t/1419/`
- **Dados**: IPCA por grupos de produtos
- **Período**: Variação mensal de 2019

### **IBGE Agregados**
- **URL**: `https://servicodados.ibge.gov.br/api/v3/agregados`
- **Dados**: Indicadores econômicos
- **Filtros**: Indicadores relevantes (IR, PC, IA, IQ, LA, PZ, MC, SC, SI)

## 🛠️ Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```