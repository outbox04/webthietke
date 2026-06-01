"use client";

import { stickyActions } from "@/data/landing";

export function StickyCta({ onOpenLead }: { onOpenLead: () => void }) {
  return (
    <nav aria-label="Liên hệ nhanh" className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-soft backdrop-blur md:left-auto md:right-6 md:bottom-6 md:w-56 md:rounded-lg md:border md:p-3">
      <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
        {stickyActions.map((action) => {
          const Icon = action.icon;
          const className =
            "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-bold text-white transition hover:bg-secondary md:text-sm";

          if (action.type === "form") {
            return (
              <button key={action.label} type="button" onClick={onOpenLead} className={className}>
                <Icon size={17} aria-hidden="true" />
                <span>{action.label}</span>
              </button>
            );
          }

          return (
            <a key={action.label} href={action.href} className={className}>
              <Icon size={17} aria-hidden="true" />
              <span>{action.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
