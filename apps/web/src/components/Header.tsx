import { useRole } from "@/hooks/useRole";
import Image from "next/image";
import { LogoutButton } from "./user/logout";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { OrganizationDropdown } from "./orgDropdown";

export const Header = async ({ setup = false }) => {
  const t = await getTranslations("Header");

  return (
    <nav className="bg-main px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {!setup && (
          <>
            <Link href="/dashboard" className="text-white hover:text-gray-200">
              {t("dashboard")}
            </Link>
            <Link href="/employees" className="text-white hover:text-gray-200">
              {t("employees")}
            </Link>

            <Link href="/profile" className="text-white hover:text-gray-200">
              {t("profile")}
            </Link>
            <Link href="/my-org" className="text-white hover:text-gray-200">
              Minha organização
            </Link>
          </>
        )}
      </div>
      {!setup && (
        <div className="flex align-middle space-x-2">
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};
