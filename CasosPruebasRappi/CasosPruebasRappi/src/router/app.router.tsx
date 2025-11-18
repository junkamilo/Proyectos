import { createBrowserRouter } from 'react-router-dom';
import { Objetivos } from '../pages/Objetivos/Objetivos';
import { Redaccion } from '../pages/Redaccion/Redaccion';
import { Botones } from '../pages/Botones/Botones';
import { Texto } from '../pages/Texto/Texto';
import { Variables } from '../pages/Variables/Variables';
import { NombresCasosPruebas } from '../pages/NombreCasosPruebas/NombresCasosPruebas';
import { Titulos } from '../pages/Titulos/Titulos';
import { App } from '../components/App/App';

export const Approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Objetivos /> },
      { path: "redaccion", element: <Redaccion /> },
      { path: "botones", element: <Botones /> },
      { path: "texto", element: <Texto /> },
      { path: "variables", element: <Variables /> },
      { path: "nombresCasosPrubas", element: <NombresCasosPruebas /> },
      { path: "titulos", element: <Titulos /> },
    ],
  },
]);

