export type CornerBoxAction = {
  label: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
  kind?: "primary" | "secondary" | "meta";
};

export type CornerBoxProps = {
  href?: string;
  ariaLabel?: string;
  variant?: "default" | "archive" | "issue" | "page" | "lore" | "compact" | "minimal" | "cover";
  mode?: "link" | "menu" | "split";
  mark?: "fleur-de-lis" | "socarengue-s" | "issue" | "none";
  markSrc?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  issueLabel?: string;
  pageLabel?: string;
  actionLabel?: string;
  actions?: CornerBoxAction[];
  sticky?: boolean;
  fixed?: boolean;
  className?: string;
};
