import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppContext, AppProvider} from './context/AppContext';
import ConfiguratorMenu from './components/ConfiguratorMenu';
import ComponentMenu from './components/ComponentsMenu';
import VisualPort from './components/VisualPort';
import WiringSection from './components/WiringSection';
import SelectionMenu from './components/SelectionMenu';

function App() {
  
   return (
    <AppProvider>
      <ConfiguratorMenu/>
      <div class="container text-center">
        <div class = "col">
          <div class="row align-items-start">
            <div class="col alert alert-secondary" style = {{flex: "0 0 auto", width: "400px", marginLeft: "-50px", height: "420px", textAlign: "left", overflowY: "scroll",}} >
              <ComponentMenu/>
            </div>
            <VisualPort/>
          </div>
          <SelectionMenu/>
          <WiringSection/>
        </div>
      </div>
    </AppProvider>
  )
}

export default App;
