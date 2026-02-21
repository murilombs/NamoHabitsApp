# NamoHabitsApp - Guia de Início Rápido

## Comece em 5 minutos

### Passo 1: Instalar Dependências

```bash
cd c:\Users\muril\test-namu\NamoHabitsApp
npm install
```

### Passo 2: Instalar Backend Simulado (Opcional)

Se você não tiver um backend pronto, use o servidor simulado:

```bash
# Instalar dependências do servidor simulado
npm install --save-dev express body-parser cors

# Em um novo terminal, inicie o servidor simulado
node mock-server.js
```

Você deverá ver:

```
Servidor de API simulado em execução em http://localhost:3000
Pressione Ctrl+C para parar
```

### Passo 3: Iniciar o Aplicativo

#### Para Android:

```bash
npm run Android

```

#### Para iOS:

```bash
npm run ios
```

#### Ou use o Metro Bundler e compile com o Android Studio/Xcode:

```bash
npm start
```

## Testando o Aplicativo

### Exemplos de Ações para Experimentar:

1. **Ver Lista de Hábitos**

- O aplicativo abre com hábitos de exemplo (se estiver usando um servidor de simulação)

- Cada hábito mostra o status de conclusão de hoje

2. **Adicionar um Novo Hábito**

- Toque no botão azul **+**

- Preencha: Título, Descrição (opcional), Categoria

- Toque em Criar

- O novo hábito aparece na lista

3. **Ver Detalhes do Hábito**

- Toque em qualquer cartão de hábito

- Veja o calendário do mês atual

- Veja sua sequência

4. **Fazer Check-in**

- Abra os detalhes de um hábito

- Toque em **✓ Fazer Check-in Hoje**

- O calendário é atualizado com o check-in de hoje

5. **Editar um Hábito**

- Abra um hábito

- Toque em **Editar**

- Modifique os detalhes

- Toque em **Atualizar**

6. **Excluir um hábito**

- Abra um hábito

- Toque em **Excluir**

- Confirme a exclusão

## 🔌 Conectando ao seu backend

Se você tiver sua própria API REST, atualize a URL da API em `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-api-url.com'; // Alterar isto
```

Certifique-se de que sua API forneça estes endpoints:

- `GET /habits`
- `POST /habits`
- `PUT /habits/:id`
- `DELETE /habits/:id`
- `POST /habits/:id/check-in`

## Arquivos do Projeto

### Arquivos Principais

- **App.tsx** - Ponto de entrada principal do aplicativo com navegação
- **src/context/HabitContext.tsx** - Gerenciamento de estado global
- **src/services/api.ts** - Comunicação com o backend

### Telas

- **src/screens/HabitListScreen.tsx** - Visualização da lista principal
- **src/screens/HabitFormScreen.tsx** - Formulário de adicionar/editar
- **src/screens/HabitDetailScreen.tsx** - Visualização de detalhes

### Componentes

- **src/components/HabitCard.tsx** - Item da lista de hábitos
- **src/components/HabitCalendar.tsx** - Calendário mensal
- **src/components/FloatingAddButton.tsx** - Botão Adicionar

### Tipos

- **src/types/habit.ts** - Definições TypeScript

## Solução de problemas

### "Não foi possível conectar a localhost:3000"

- Inicie o servidor de simulação: `node mock-server.js`
- Ou certifique-se de que seu backend esteja em execução
- Verifique as configurações do firewall

### Erros de "Módulo não encontrado"

```bash
# Limpe o cache e reinstale
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Problemas de compilação do Android

```bash
# Limpe a compilação
cd android
./gradlew clean
cd ..
npm run android
```

### Problemas de compilação no iOS

```bash
cd ios
rm -rf Pods
pod install
cd ..
npm run ios
```

## Documentação

- **SETUP_GUIDE.md** - Instruções detalhadas de configuração
- **ARCHITECTURE.md** - Arquitetura e design do aplicativo
- **mock-server.js** - Código de exemplo do servidor backend

## Principais recursos explicados

### Cálculo de sequência

- Conta dias consecutivos com check-ins
- Reinicia se um dia for perdido
- Exibido nos cartões e na página de detalhes

### Visualização de calendário

- Mostra todos os check-ins do mês atual
- Verde indica dias concluídos
- Cinza indica dias perdidos

### Validação de formulário

- Título obrigatório
- Categoria obrigatória
- Feedback em tempo real

### Status Indicador

- **✓** (círculo verde) = Concluído hoje
- **○** (círculo cinza) = Não concluído hoje

## Personalização

### Alterar Cores

Edite as constantes de cor na `StyleSheet` de cada componente:

```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#40C4FF', // Alterar esta cor
  },
});
```

### Modificar Categorias

Edite o array `CATEGORIES` em `HabitFormScreen.tsx`:

```typescript
const CATEGORIES = [
  'Saúde',
  'Fitness',
  'Aprendizado',
  'Trabalho',
  'Pessoal',
  'Outros',
];

// Adicione ou remova categorias aqui
```

## Exemplos de Resposta da API

### Obter Hábito

```json
{
  "id": "1",

  "title": "Exercício Matinal",

  "description": "30 minutos",

  "category": "Fitness",

  "createdAt": "2024-01-15T10:00:00Z",

  "checkIns": [
    { "date": "2024-02-19", "completedAt": "2024-02-19T07:30:00Z" },

    { "date": "2024-02-18", "completedAt": "2024-02-18T08:00:00Z" }
  ]
}
```

### Criar Hábito

**Solicitação:**

```json
{
  "título": "Ler",

  "descrição": "20 minutos",

  "categoria": "Aprendizado",

  "criadoEm": "2024-02-19T10:00:00Z",

  "checkIns": []
}
```
