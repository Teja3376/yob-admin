import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

type Props = {
  code: string;
};

export default function CountryFormat({ code }: Props) {
  const name = countries.getName(code.toUpperCase(), "en");

  return (
    <span style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      <span>{name}</span>
    </span>
  );
}