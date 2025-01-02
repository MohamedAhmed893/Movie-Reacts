
import  ReactDOM  from 'react-dom/client';
import {  HashRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'

let root =ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <HashRouter>
     <App/>
  </HashRouter>
)