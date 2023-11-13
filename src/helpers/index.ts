import { Currency } from "../types/types";

export function getCurrencyIcon(currency: Currency): string {
  switch (currency) {
    case Currency.LTC:
      return '/assets/images/coins/ltc-icon.svg';
    case Currency.XRP:
      return '/assets/images/coins/ripple.svg';  
    case Currency.ADA:
      return '/assets/images/coins/ada.svg';
    default:
      return '/assets/images/coins/ltc-icon.svg';
  }
}