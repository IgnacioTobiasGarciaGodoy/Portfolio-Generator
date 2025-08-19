import React from "react";
import Tag from "./Tag";

export default function SkillList({
  skills = [],
  size = "md",
  className = "",
  tagProps = {},
}) {
  return (
    <div className={["flex flex-wrap gap-4", className].join(" ")}>
      {skills.map((s, i) => (
        <Tag key={i} text={s} size={size} {...tagProps} />
      ))}
    </div>
  );
}
