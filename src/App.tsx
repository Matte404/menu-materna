import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/viva-light/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
// import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import "./App.css";
import MenuCalendarPage from "./pages/MenuCalendarPage";

const App = () => {
  return (
    <PrimeReactProvider>
      <MenuCalendarPage />
    </PrimeReactProvider>
  );
};

export default App;
