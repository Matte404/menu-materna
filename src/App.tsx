import { PrimeReactProvider, addLocale } from "primereact/api";
import primeLocale from "./locales/prime.json";

import "primereact/resources/themes/lara-light-teal/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import "./App.css";
import { MenuCalendarPage } from "./pages/MenuCalendarPage";

const App = () => {
  const lang = "it";
  addLocale(lang, primeLocale[lang]);

  return (
    <PrimeReactProvider>
      <MenuCalendarPage />
    </PrimeReactProvider>
  );
};

export default App;
