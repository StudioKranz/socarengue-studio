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
    <svg viewBox="0 0 1024 1024" aria-hidden="true" className="h-11 w-9 text-ember">
      <path
        d="M465.641,588.319L470.061,588.343C457.418,402.58 274.893,378.347 501,140C735.83,372.746 544.416,393.478 530.947,588.668L534.96,588.69C540.636,554.246 551.321,518.969 561.683,489.358C607.27,359.086 838.237,372.47 796.489,534.222C789.683,560.592 712.498,618.658 693,587C721.121,495.058 636.715,501.471 594.849,550.387C585.177,561.687 577.632,575.135 572.743,588.892L593,589C598.519,605.16 598.804,617.795 594,627L566.45,627.292C568.066,660.138 590.852,683.353 644,665C697.893,720.933 599.691,761.842 552.681,707.874C545.454,699.577 540.275,689.666 536.778,678.588C540.76,700.263 546.702,723.65 555,749L501,829L444,749C453.468,721.755 460.079,696.845 464.359,673.929C460.871,686.084 455.456,696.919 447.655,705.874C400.646,759.842 302.443,718.933 356.336,663C407.628,680.712 430.641,659.709 433.639,628.697L405,629C394.562,620.066 397.397,605.3 406,588L428.022,588.118C423.15,573.936 415.446,560.023 405.488,548.387C363.621,499.471 279.216,493.058 307.336,585C287.838,616.658 210.654,558.592 203.847,532.222C162.099,370.47 393.066,357.086 438.653,487.358C449.179,517.436 460.037,553.36 465.641,588.319ZM469.463,637.085C469.723,634.124 469.941,631.2 470.12,628.311L469.466,628.318C469.525,631.27 469.526,634.194 469.463,637.085ZM530.668,627.67C530.726,628.779 530.789,629.892 530.857,631.011C530.876,629.9 530.903,628.786 530.938,627.667L530.668,627.67Z"
        fill="currentColor"
        transform="matrix(1.261557 0 0 1.261557 -119.885965 -81.285915)"
      />
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
