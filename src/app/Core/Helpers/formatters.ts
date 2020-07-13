export type Currencies = "BRL";
export type Languages = "pt-BR";

/**
 * Formata um valor númerico (do tipo number ou string) para
 * um valor da moeda correspondente.
 * Default = "BRL".
 *
 * Ex: 10.99 => R$ 10,99
 */
export function formatCurrency(
  value: number | string,
  currency: Currencies = "BRL"
): string {
  if (value == null) {
    return "";
  }

  if (typeof value === "string") {
    value = parseInt(value);
  }

  const getLanguage = (): Languages => {
    switch (currency) {
      case "BRL": {
        return "pt-BR";
      }

      default:
        return "pt-BR";
    }
  };

  const language = getLanguage();

  const formated = value.toLocaleString(language, {
    style: "currency",
    currency,
  });

  return formated;
}
