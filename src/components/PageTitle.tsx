"use client";

type PageTitleProps = {
  title?: string;
  suffix?: string;
};

export default function PageTitle({ title, suffix }: PageTitleProps) {
  const finalTitle = title
    ? suffix
      ? `${title} | ${suffix}`
      : title
    : suffix || "App";

  if (typeof document !== "undefined") {
    document.title = finalTitle;
  }

  return null;
}