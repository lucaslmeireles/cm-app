import { ReactNode } from "react";
import { Text } from "../ui/atoms/Text";

interface DashboardTemplateProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

/**
 * Template específico para páginas de dashboard
 * Combina header com título, área de ações e layout de conteúdo
 */
export const DashboardTemplate = ({
  title,
  subtitle,
  actions,
  sidebar,
  children,
}: DashboardTemplateProps) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header com título e ações */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="h1" className="mb-2">
                {title}
              </Text>
              {subtitle && (
                <Text variant="body" color="secondary">
                  {subtitle}
                </Text>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-3">{actions}</div>
            )}
          </div>
        </div>
      </header>

      {/* Layout principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar opcional */}
          {sidebar && <aside className="w-80 space-y-6">{sidebar}</aside>}

          {/* Conteúdo principal */}
          <main className="flex-1 space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
};
