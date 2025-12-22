import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Template básico para páginas da aplicação
 * Segue o padrão de Design Atômico - Templates definem a estrutura de layout
 */
export const PageTemplate = ({
  children,
  header,
  sidebar,
  footer,
  className = "",
}: TemplateProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        {sidebar && (
          <aside className="w-64 border-r bg-muted/40 hidden lg:block">
            <div className="h-full p-4">{sidebar}</div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Footer */}
      {footer && <footer className="border-t bg-background">{footer}</footer>}
    </div>
  );
};
