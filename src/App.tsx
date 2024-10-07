import { PrimeReactProvider, addLocale } from "primereact/api";
import primeLocale from "./locales/prime.json";

// import "primereact/resources/themes/lara-light-teal/theme.css"; //theme
import "primeflex/primeflex.css"; // flex
import "primeicons/primeicons.css"; //icons
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/saga-green/theme.css"; //theme

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
