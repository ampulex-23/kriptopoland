import { Lang, User } from "../types/types";

export interface DashboardProps {
  user: User;
  jwt: string;
  onSignOut(): void;
  lang: Lang;
  onSetLang(lang: Lang): void;
  config: any;
}
