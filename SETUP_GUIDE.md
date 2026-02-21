# NamoHabitsApp - Aplicativo de Rastreamento de Hábitos em React Native

Um aplicativo de rastreamento de hábitos, desenvolvido com React Native.

## Funcionalidades

### 1. **Tela de Lista de Hábitos**

- Visualize todos os hábitos em um layout de lista baseado em cartões
- Indicação visual de status mostrando se os hábitos foram concluídos hoje
- Botão flutuante para adicionar novos hábitos
- Informações rápidas sobre a sequência de hábitos em cada cartão

### 2. **Tela de Formulário de Hábitos**

- Adicione novos hábitos com título, descrição e categoria
- Edite hábitos existentes
- Validação do formulário (título e categoria são obrigatórios)
- Seleção de categoria
- Campo de descrição opcional

### 3. **Tela de Detalhes do Hábito**

- Calendário visual mostrando os check-ins do mês atual
- Contador de sequência atual
- Contador de check-ins totais
- Botão de check-in diário
- Opções de editar e excluir
- Indicação visual do status de conclusão de hoje

## Tecnologias Utilizadas

- **Frontend**: React Native com TypeScript
- **Gerenciamento de Estado**: Context API
- **Navegação**: React Navigation (Native Stack Navigator)
- **API Comunicação**: API REST (Fetch API)
- **Estilização**: Folha de Estilo React Native

## Estrutura do Projeto

```
src/
├── components/ # Componentes de UI reutilizáveis
│ ├── HabitCard.tsx # Componente de cartão de hábito individual
│ ├── HabitCalendar.tsx # Visualização do calendário mensal
│ └── FloatingAddButton.tsx # Botão de ação flutuante
├── context/ # Gerenciamento de estado
│ └── HabitContext.tsx # Provedor de contexto de dados de hábitos
├── screens/ # Telas do aplicativo
│ ├── HabitListScreen.tsx # Lista principal de hábitos
│ ├── HabitFormScreen.tsx # Adicionar/editar formulário de hábito
│ └── HabitDetailScreen.tsx # Página de detalhes do hábito
├── services/ # Comunicação com a API
│ └── api.ts # Chamadas à API do backend
└── types/ # Definições de tipo TypeScript

└── habit.ts # Interfaces relacionadas a hábitos
```

## Instruções de Configuração

### Pré-requisitos

- Node.js >= 22.11.0
- npm ou yarn
- React Native CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

1. **Instale as dependências:**

```bash
npm install
```

2. **Certifique-se de que a API do backend esteja em execução:**

O aplicativo espera uma API REST em execução em `http://localhost:3000`

A API deve ter os seguintes endpoints:

- `GET /habits` - Obter todos os hábitos
- `GET /habits/:id` - Obter um hábito específico
- `POST /habits` - Criar um novo hábito
- `PUT /habits/:id` - Atualizar um hábito
- `DELETE /habits/:id` - Excluir um hábito
- `POST /habits/:id/checkins` - Fazer check-in de um hábito

3. **Inicie o servidor de desenvolvimento:**

Para Android:

``bash

npm run android

```

Para iOS:

``bash

npm run ios

```

Ou inicie o Metro Bundler:

``bash

npm start

````

## Integração com a API

### Requisitos do Backend

O aplicativo se comunica com uma API REST em `http://localhost:3000`. Certifique-se de que seu backend forneça as seguintes estruturas de dados:

#### Objeto Habit

```typescript
interface Habit {
    id: string;
    title: string;
    description?: string;
    category: string;
    color?: string;
    createdAt: string;
    checkIns: CheckIn[];
}
interface CheckIn {
    date: string;
    completedAt?: string;
}

````

### Endpoints da API Disponíveis

#### Obter Todos os Hábitos

```
GET /habits
```

Retorna: `Habit[]`

#### Obter um Hábito Específico

```
GET /habits/:id

```

Retorna: `Habit`

#### Criar Novo Hábito

```
POST /habits
Corpo: {

título: string,

descrição?: string,

categoria: string,

cor?: string,

criadoEm: string,

checkIns: []
}
```

Retorna: `Habit`

#### Atualizar Hábito

```
PUT /habits/:id

Corpo: {

título: string,

descrição?: string,

categoria: string
}
```

Retorna: `Habit`

#### Excluir Hábito

```
DELETE /habits/:id
```

#### Check-in para um Hábito

```
POST /habits/:id/check-in
Corpo: {

date: string,

completedAt: string
}
```

Retorna: `Hábito`

## Persistência de Dados

- **Sem cache de armazenamento local** - Todos os dados são obtidos da API REST
- **Sincronização automática** - Atualizações de contexto acionam chamadas automáticas à API
- **Atualizações em tempo real** - As alterações são refletidas imediatamente na interface do usuário

## Guia de Uso

### Adicionando um Hábito

1. Toque no botão flutuante **+** no canto inferior direito
2. Insira o título do hábito (obrigatório)
3. Adicione uma descrição opcional
4. Selecione uma categoria
5. Toque em **Criar** para salvar

### Fazendo Check-in

1. Abra a página de detalhes de um hábito tocando no cartão do hábito
2. Toque no botão **✓ Fazer Check-in Hoje**
3. O check-in de hoje foi registrado.

### Visualizando Sequências

- A sequência atual é exibida tanto nos cartões da lista quanto na página de detalhes.
- A visualização do calendário mostra todos os dias de check-in do mês atual.
- Indicadores verdes mostram os dias concluídos.

### Editando um Hábito

1. Abra a página de detalhes do hábito.
2. Toque no botão **Editar**.
3. Modifique os detalhes do hábito.
4. Toque em **Atualizar** para salvar as alterações.

### Excluindo um Hábito

1. Abra a página de detalhes do hábito.
2. Toque no botão **Excluir**.
3. Confirme a exclusão.

## Fluxo de Gerenciamento de Estado

```
App.tsx (HabitProvider)

↓
HabitContext (Estado Global)
├─ Screens
│ ├─ TelaListaDeHábitos
│ ├─ TelaFormulárioDeHábitos
│ └─ TelaDeDetalhesDoHábito
└─ Componentes
├─ CartãoDeHábito
├─ CalendárioDeHábitos
└─ BotãoAdicionarFlutuante
```

## Estilo

O aplicativo utiliza um design limpo e moderno com:

- **Cor Primária**: #40C4FF (Azul Ciano)
- **Cor de Sucesso**: #4CAF50 (Verde)
- **Cor de Erro**: #d32f2f (Vermelho)
- **Neutro**: #1a1a1a (Texto Escuro), #f9f9f9 (Fundo)

## Otimizações de Desempenho

- Renderização eficiente de listas com FlatList
- Cálculos de sequência memorizados
- Otimizado Renderizações com a API de Contexto
- Gerenciamento adequado de foco em formulários

## Solução de Problemas

### Problemas de Conexão com a API

- Certifique-se de que o backend esteja rodando em `http://localhost:3000`
- Verifique a conectividade de rede
- Verifique se o CORS está configurado corretamente no backend

### Problemas de Compilação

```bash
# Limpar todos os caches
npm start -- --reset-cache

# Reinstalar node_modules
rm -rf node_modules
npm install

# Específico para Android
cd android && ./gradlew clean && cd ..
```

### Erros do TypeScript

```bash
npm run lint
```

## Comandos de Desenvolvimento

```bash
# Iniciar o desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar testes
npm test

# Verificar o código (lint)
npm run lint
```

## Licença

Este projeto é privado.
