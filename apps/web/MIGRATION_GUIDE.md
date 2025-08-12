# 🚀 Guia de Migração para Atomic Design + Melhores Práticas

## 📋 Resumo das Melhorias Implementadas

### 1. **Estrutura de Atomic Design**

```
src/components/
├── ui/
│   ├── atoms/           # ✅ Criados: Text, IconButton, Badge
│   ├── molecules/       # ✅ Criados: MetricItem, CollapsibleHeader  
│   ├── organisms/       # ✅ Criados: AssessmentCard refatorizado
│   └── templates/       # ✅ Criados: PageTemplate, DashboardTemplate
└── feature/
    └── assessment/      # ✅ Criado: AssessmentPage completa
```

### 2. **Componentes Criados**

#### Átomos

- **`Text.tsx`**: Componente de tipografia com variantes (h1-h4, body, caption)
- **`IconButton.tsx`**: Botão para ícones com variantes (ghost, outline, default)
- **`Badge.tsx`**: Badges coloridos para status e métricas

#### Moléculas

- **`MetricItem.tsx`**: Exibe métrica individual com score colorido
- **`CollapsibleHeader.tsx`**: Header expansível reutilizável

#### Organismos

- **`AssessmentCard.tsx`**: Card de avaliação refatorizado usando átomos/moléculas
- **`AssessmentsContainer.tsx`**: Container completo de avaliações

#### Templates

- **`PageTemplate.tsx`**: Template básico com header/sidebar/footer
- **`DashboardTemplate.tsx`**: Template específico para dashboards

#### Páginas (Feature)

- **`AssessmentPage.tsx`**: Página completa usando template + organismos

### 3. **Hooks Melhorados**

- **`useAssessments.ts`**: Hook personalizado para gerenciar estado de avaliações
- Padrão de loading/error states
- Suporte a refetch e cache básico

## 🎯 Próximos Passos para Implementação

### 1. **Instalar Dependências Recomendadas**

```bash
# Para melhor gerenciamento de estado de servidor
npm install @tanstack/react-query

# Para validação de formulários
npm install react-hook-form @hookform/resolvers zod

# Para notificações
npm install sonner

# Para animações
npm install framer-motion
```

### 2. **Configurar React Query (Recomendado)**

```tsx
// app/layout.tsx ou _app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### 3. **Migração Gradual dos Componentes Existentes**

#### Passo 1: Migrar átomos básicos

- [ ] Migrar botões existentes para `ui/atoms/Button.tsx`
- [ ] Migrar textos para `ui/atoms/Text.tsx`
- [ ] Criar `ui/atoms/Input.tsx` baseado nos inputs existentes

#### Passo 2: Migrar moléculas

- [ ] Refatorar `components/assessment/` usando moléculas
- [ ] Refatorar `components/employee/` usando moléculas
- [ ] Refatorar `components/department/` usando moléculas

#### Passo 3: Migrar organismos

- [ ] Mover cards complexos para `ui/organisms/`
- [ ] Mover tabelas para `ui/organisms/`
- [ ] Mover formulários para `ui/organisms/`

#### Passo 4: Criar templates

- [ ] Criar `AuthTemplate.tsx` para páginas de login
- [ ] Criar `SettingsTemplate.tsx` para configurações
- [ ] Criar `ReportTemplate.tsx` para relatórios

### 4. **Melhorar Busca de Dados da API**

#### Problema Atual

```tsx
// ❌ Ruim - Sem cache, sem loading states, sem error handling
const [data, setData] = useState();
useEffect(() => {
  fetchData().then(setData);
}, []);
```

#### Solução Melhorada

```tsx
// ✅ Bom - Com cache, loading, error handling
const { data, isLoading, error } = useAssessments();

if (isLoading) return <Loading />;
if (error) return <ErrorMessage error={error} />;
return <AssessmentsList data={data} />;
```

### 5. **Implementar Design System**

#### Criar arquivo de tokens

```tsx
// src/design-system/tokens.ts
export const tokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    },
    // ...
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    // ...
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      // ...
    },
  },
};
```

## 🔧 Exemplos de Uso

### Usando o Template de Dashboard

```tsx
import { DashboardTemplate } from '@/components/ui/templates/DashboardTemplate';
import { AssessmentsCard } from '@/components/ui/organisms/AssessmentsContainer';

export default function EmployeePage({ employee }) {
  const { data: stats } = useAssessmentStats(employee.id);
  
  return (
    <DashboardTemplate
      title={`Funcionário: ${employee.name}`}
      subtitle="Gerencie informações do funcionário"
      actions={<EditEmployeeButton employee={employee} />}
      sidebar={<EmployeeStats stats={stats} />}
    >
      <AssessmentsCard employee={employee} />
      <EmployeeMetrics employee={employee} />
    </DashboardTemplate>
  );
}
```

### Usando Hooks de Dados

```tsx
import { useAssessments, useCreateAssessment } from '@/hooks/useAssessments';

export function AssessmentManager() {
  const { data: assessments, isLoading } = useAssessments();
  const { mutate: createAssessment } = useCreateAssessment();
  
  const handleCreate = (formData) => {
    createAssessment(formData, {
      onSuccess: () => {
        toast.success('Avaliação criada com sucesso!');
      },
      onError: (error) => {
        toast.error('Erro ao criar avaliação');
      },
    });
  };
  
  // ...
}
```

## 📊 Benefícios da Nova Estrutura

1. **Reutilização**: Componentes podem ser usados em múltiplos contextos
2. **Manutenibilidade**: Mudanças isoladas e previsíveis
3. **Performance**: Lazy loading e cache otimizado
4. **Testabilidade**: Cada nível pode ser testado independentemente
5. **Escalabilidade**: Fácil adicionar novos features
6. **Consistência**: Design system unificado
7. **DX (Developer Experience)**: Melhor organização e produtividade

## 🚦 Status da Migração

- [x] Estrutura de pastas criada
- [x] Átomos básicos implementados
- [x] Moléculas iniciais criadas  
- [x] Organismos refatorados
- [x] Templates básicos criados
- [x] Hooks melhorados implementados
- [ ] Migração completa dos componentes existentes
- [ ] Implementação do design system
- [ ] Testes unitários
- [ ] Documentação no Storybook

---

**Próximo passo**: Comece migrando um módulo por vez, começando pelos componentes mais simples (átomos) e subindo gradualmente para organismos e páginas.
