import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AppProvider} from './context/AppContext';
import ConfiguratorMenu from './components/ConfiguratorMenu';
import ComponentMenu from './components/ComponentsMenu';
import Visualizer from './components/Visualizer';
import Render from './components/render';

function App() {
   return (
    <AppProvider>
      <ConfiguratorMenu/>
      <div class="container text-center">
        <div class="row align-items-start">
          <div class="col alert alert-secondary" style = {{width: "200px", marginLeft: "-80px", height: "420px", textAlign: "left"}}>
            <ComponentMenu/>
          </div>
          <div class="col">
            <Visualizer/>
          </div>
        </div>
      </div>
    </AppProvider>
  )
}

export default App;
