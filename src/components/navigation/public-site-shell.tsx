import type { ReactNode } from "react";
import { defaultCornerBoxConfig } from "@/config/corner-box";
import { CornerBox } from "@/components/navigation/corner-box";
import type { CornerBoxProps } from "@/types/corner-box";

interface PublicSiteShellProps {
  children: ReactNode;
  cornerBox?: CornerBoxProps | false;
}

export function PublicSiteShell({ children, cornerBox }: PublicSiteShellProps) {
  const cornerBoxConfig = cornerBox === false ? null : { ...defaultCornerBoxConfig, ...cornerBox };
  const cornerBoxClassName = ["max-w-[18rem] md:max-w-none", cornerBoxConfig?.className].filter(Boolean).join(" ");

  return (
    <>
      {cornerBoxConfig ? (
        <aside className="archive-shell pt-4 md:pt-5" aria-label="Socarengue archive navigation">
          <CornerBox {...cornerBoxConfig} className={cornerBoxClassName} />
        </aside>
      ) : null}
      {children}
    </>
  );
}
