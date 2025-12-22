# Guia de Atomic Design - Estrutura de Componentes

## 📋 Estrutura de Pastas

```
src/components/
├── ui/                          # Componentes de UI reutilizáveis
│   ├── atoms/                   # Componentes básicos
│   │   ├── Text.tsx            # Tipografia
│   │   ├── Button.tsx          # Botões
│   │   ├── Badge.tsx           # Badges/Tags
│   │   ├── IconButton.tsx      # Botões com ícones
│   │   └── Input.tsx           # Inputs básicos
│   │
│   ├── molecules/              # Combinação de átomos
│   │   ├── CollapsibleHeader.tsx
│   │   ├── MetricItem.tsx
│   │   ├── SearchBox.tsx
│   │   └── FormField.tsx
│   │
│   ├── organisms/              # Seções complexas da interface
│   │   ├── AssessmentCard.tsx
│   │   ├── AssessmentsContainer.tsx
│   │   ├── NavigationMenu.tsx
│   │   └── DataTable.tsx
│   │
│   └── templates/              # Layouts de página
│       ├── PageTemplate.tsx
│       ├── DashboardTemplate.tsx
│       └── AuthTemplate.tsx
│
└── feature/                    # Componentes específicos de funcionalidade
    ├── assessment/
    │   ├── AssessmentPage.tsx  # Páginas completas
    │   ├── AssessmentForm.tsx  # Formulários específicos
    │   └── AssessmentCharts.tsx
    │
    ├── employee/
    └── department/
```

## 🧩 Definições dos Níveis

### 1. **Átomos** (atoms/)
Componentes básicos e indivisíveis da interface. Não possuem lógica de negócio.

**Características:**
- Sem dependências de outros componentes
- Altamente reutilizáveis
- Props simples e bem definidas
- Estilização básica e consistente

**Exemplos:**
- Botões
- Inputs
- Textos
- Ícones
- Badges

### 2. **Moléculas** (molecules/)
Combinação de átomos que formam componentes funcionais.

**Características:**
- Combinam 2-3 átomos
- Têm uma função específica
- Podem ter estado interno simples
- Reutilizáveis em diferentes contextos

**Exemplos:**
- Campo de busca (Input + Button)
- Item de métrica (Text + Badge)
- Header expansível (Text + IconButton)

### 3. **Organismos** (organisms/)
Combinação de moléculas e átomos que formam seções da interface.

**Características:**
- Podem ter lógica complexa
- Gerenciam estado interno
- Específicos para um domínio
- Podem consumir dados de APIs

**Exemplos:**
- Card de avaliação completo
- Container de avaliações
- Menu de navegação
- Tabela de dados

### 4. **Templates** (templates/)
Estruturas de layout que definem como os organismos se organizam na página.

**Características:**
- Definem estrutura de layout
- Não possuem dados reais
- Focam na composição visual
- Reutilizáveis entre diferentes páginas

**Exemplos:**
- Template de dashboard
- Template de página básica
- Template de autenticação

### 5. **Páginas** (feature/)
Implementações específicas dos templates com dados reais.

**Características:**
- Combinam templates + organismos
- Possuem lógica de negócio específica
- Gerenciam estado da aplicação
- Conectam com APIs e contextos

## 🔧 Boas Práticas

### Para Átomos:
```tsx
// ✅ Bom - Simples e reutilizável
export const Button = ({ 
  children, 
  variant = "default", 
  size = "md",
  onClick,
  ...props 
}) => {
  return (
    <button 
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// ❌ Ruim - Lógica de negócio em átomo
export const SubmitButton = ({ formId, onSuccess }) => {
  const handleSubmit = async () => {
    // lógica complexa aqui...
  };
  // ...
};
```

### Para Moléculas:
```tsx
// ✅ Bom - Combina átomos com propósito específico
export const SearchBox = ({ onSearch, placeholder }) => {
  const [value, setValue] = useState("");
  
  return (
    <div className="flex gap-2">
      <Input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <IconButton onClick={() => onSearch(value)}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};
```

### Para Organismos:
```tsx
// ✅ Bom - Lógica complexa e gerenciamento de estado
export const AssessmentCard = ({ assessment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { mutate: deleteAssessment } = useDeleteAssessment();
  
  return (
    <Card>
      <CollapsibleHeader 
        title={assessment.title}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && (
        <CardContent>
          {assessment.metrics.map(metric => (
            <MetricItem key={metric.id} metric={metric} />
          ))}
        </CardContent>
      )}
    </Card>
  );
};
```

### Para Templates:
```tsx
// ✅ Bom - Foca na estrutura de layout
export const DashboardTemplate = ({ 
  title, 
  actions, 
  sidebar, 
  children 
}) => {
  return (
    <div className="dashboard-layout">
      <Header title={title} actions={actions} />
      <div className="content-area">
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
        <Main>{children}</Main>
      </div>
    </div>
  );
};
```

## 📊 Vantagens desta Estrutura

1. **Reutilização**: Componentes podem ser facilmente reutilizados
2. **Manutenibilidade**: Mudanças são isoladas e previsíveis
3. **Testabilidade**: Cada nível pode ser testado independentemente
4. **Escalabilidade**: Fácil adicionar novos componentes
5. **Consistência**: Design system coeso
6. **Colaboração**: Estrutura clara para toda a equipe

## 🚀 Próximos Passos

1. **Migração gradual**: Mova componentes existentes para a nova estrutura
2. **Documentação**: Use Storybook para documentar componentes
3. **Testes**: Implemente testes unitários para cada nível
4. **Design System**: Crie tokens de design consistentes
5. **Performance**: Implemente lazy loading para páginas
