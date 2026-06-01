type SectionHeadingProps = {
  kicker: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({ kicker, title, copy, align = "left", inverse = false }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="section-kicker">{kicker}</span>
      <h2 className={`section-title ${inverse ? "!text-white" : ""}`}>{title}</h2>
      {copy ? <p className={`section-copy ${inverse ? "!text-slate-300" : ""}`}>{copy}</p> : null}
    </div>
  );
}
