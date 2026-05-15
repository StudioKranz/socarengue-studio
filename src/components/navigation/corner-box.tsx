import Link from "next/link";
import type { CornerBoxAction, CornerBoxProps } from "@/types/corner-box";

const variantClasses: Record<NonNullable<CornerBoxProps["variant"]>, string> = {
  default: "border-paper/24 bg-ink/92 text-paper shadow-signal",
  archive: "border-ember/55 bg-ink/94 text-paper shadow-ember",
  issue: "border-signal/44 bg-storm/94 text-paper shadow-signal",
  page: "border-paper/28 bg-ink/94 text-paper shadow-signal",
  lore: "border-blood/50 bg-ink/94 text-paper shadow-ember",
  compact: "border-ember/45 bg-ink/94 text-paper shadow-ember",
  minimal: "border-paper/18 bg-ink/88 text-paper",
  cover: "border-ember/70 bg-ink/96 text-paper shadow-ember",
};

const actionKindClasses: Record<NonNullable<CornerBoxAction["kind"]>, string> = {
  primary: "text-ember hover:text-signal",
  secondary: "text-paper/66 hover:text-signal",
  meta: "text-paper/42 hover:text-paper",
};

const positionClasses = {
  fixed: "corner-box-fixed",
  sticky: "corner-box-sticky",
};

function FleurDeLisMark() {
  return (
    <svg viewBox="0 0 48 58" aria-hidden="true" className="h-11 w-9 text-ember">
      <path
        d="M24 3c6 7 9 13 9 18 0 4-2 7-5 9 4-1 8-4 12-8 2 8-1 15-9 19l8 3v6H27v5h-6v-5H9v-6l8-3C9 37 6 30 8 22c4 4 8 7 12 8-3-2-5-5-5-9 0-5 3-11 9-18Z"
        fill="currentColor"
      />
      <path d="M24 15v35" stroke="#05070b" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

function SocarengueSMark() {
  return (
    <span aria-hidden="true" className="font-display text-4xl leading-none text-ember">
      S
    </span>
  );
}

function IssueMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-9 items-center justify-center border border-ember/60 font-display text-2xl text-ember"
    >
      I
    </span>
  );
}

function CornerBoxMark({ mark, markSrc }: Pick<CornerBoxProps, "mark" | "markSrc">) {
  if (mark === "none") {
    return null;
  }

  if (markSrc) {
    return <img src={markSrc} alt="" className="h-11 w-11 object-contain" />;
  }

  if (mark === "socarengue-s") {
    return <SocarengueSMark />;
  }

  if (mark === "issue") {
    return <IssueMark />;
  }

  return <FleurDeLisMark />;
}

function ActionLink({ action }: { action: CornerBoxAction }) {
  const className = `block min-h-11 px-3 py-3 text-[0.62rem] uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal ${
    actionKindClasses[action.kind ?? "secondary"]
  }`;

  if (action.external) {
    return (
      <a href={action.href} aria-label={action.ariaLabel} className={className} target="_blank" rel="noreferrer">
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} aria-label={action.ariaLabel} className={className}>
      {action.label}
    </Link>
  );
}

function CornerBoxContent(props: CornerBoxProps) {
  const { actionLabel, eyebrow, issueLabel, mark = "fleur-de-lis", markSrc, pageLabel, subtitle, title } = props;

  return (
    <>
      <div className="flex items-center gap-3 border-b border-paper/14 px-3 py-3 md:block md:space-y-2 md:px-2 md:text-center">
        <CornerBoxMark mark={mark} markSrc={markSrc} />
        <div className="min-w-0 md:hidden">
          {eyebrow ? <p className="text-[0.56rem] uppercase tracking-[0.2em] text-signal/72">{eyebrow}</p> : null}
          {title ? <p className="truncate font-display text-xl leading-none text-paper">{title}</p> : null}
        </div>
      </div>

      <div className="min-w-0 px-3 py-3 md:px-2 md:text-center">
        {eyebrow ? <p className="hidden text-[0.55rem] uppercase tracking-[0.22em] text-signal/72 md:block">{eyebrow}</p> : null}
        {title ? <p className="hidden font-display text-2xl leading-none text-paper md:block">{title}</p> : null}
        {subtitle ? <p className="mt-2 text-[0.58rem] uppercase tracking-[0.16em] text-paper/52">{subtitle}</p> : null}
        {issueLabel || pageLabel ? (
          <p className="mt-2 text-[0.58rem] uppercase tracking-[0.17em] text-paper/58">
            {[issueLabel, pageLabel].filter(Boolean).join(" / ")}
          </p>
        ) : null}
        {actionLabel ? (
          <p className="mt-2 text-[0.64rem] uppercase tracking-[0.22em] text-ember md:mt-3">{actionLabel}</p>
        ) : null}
      </div>
    </>
  );
}

export function CornerBox(props: CornerBoxProps) {
  const {
    actions = [],
    ariaLabel,
    className = "",
    fixed = false,
    href = "/",
    mode = "link",
    sticky = false,
    variant = "default",
  } = props;

  const positionClass = fixed ? positionClasses.fixed : sticky ? positionClasses.sticky : "";
  const shouldRenderActions = mode !== "link" && actions.length > 0;
  const frameClass = [
    "group block min-h-16 w-full overflow-hidden border uppercase",
    "transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
    "md:w-28",
    variantClasses[variant],
    positionClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!shouldRenderActions) {
    return (
      <Link href={href} aria-label={ariaLabel} className={frameClass}>
        <CornerBoxContent {...props} />
      </Link>
    );
  }

  return (
    <div className={frameClass}>
      <Link
        href={href}
        aria-label={ariaLabel}
        className="block transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signal"
      >
        <CornerBoxContent {...props} />
      </Link>
      <div className="grid border-t border-paper/14 bg-ink/46">
        {actions.map((action) => (
          <ActionLink key={`${action.href}-${action.label}`} action={action} />
        ))}
      </div>
    </div>
  );
}
