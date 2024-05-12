import './App.css';
import Navigation from "./components/Navigation/Navigation.js"
import Project_type from './components/Project_types/Project_type.js';
import Project_card from './components/Project_types/Project_card.js';
import Project_page from './components/Project_page/Project_page.js';
import { title } from './components/Project_types/card.js';
import HealthCare_Pioneers from './components/Project_page/Healthcare_pioneers.js';
import Edu_Tech_Solutions from './components/Project_page/Edu-Tech Solutions.js';
import Women_Empower from './components/Project_page/Women Empower.js';
import Disaster_Relief_Alliance from './components/Project_page/Disaster Relief Alliance.js';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Navigation/>
      <Project_card/>
    </div>,
  },
  {
    path: "/Green Initiatives",
    element: <div><Navigation/>
    <Project_page/>,
    </div>
  },
  {
    path: "/Edu-Tech Solutions",
    element: <div><Navigation/>
    <Edu_Tech_Solutions/>,
    </div>
  },
  {
    path: "/HealthCare Pioneers",
    element: <div><Navigation/>
    <HealthCare_Pioneers/>,
    </div>
  },
  {
    path: "/Women Empower",
    element: 
    <div><Navigation/>
    <Women_Empower/>,
    </div>
  },
  {
    path: "/Disaster Relief Alliance",
    element: <Disaster_Relief_Alliance/>,
  },
]);

function App() {
  return (
    <div>
    <RouterProvider router={router} />
    </div>
      
  );
}


export default App;
