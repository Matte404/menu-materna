import { useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { Calendar } from "primereact/calendar";

import "primereact/resources/themes/viva-dark/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
// import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex

import "./App.css";

function App() {
  const [date] = useState(new Date());

  return (
    <PrimeReactProvider>
      <h1>Menu materna working</h1>
      <Calendar value={date} />
    </PrimeReactProvider>
  );
}

export default App;
