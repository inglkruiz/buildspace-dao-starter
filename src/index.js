import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

const SUPPORTED_CHAINIDS = {
  RINKEBY: 4,
};

const supportedChainIds = [SUPPORTED_CHAINIDS.RINKEBY];

// In this case, we support Metamask which is an "injected wallet".
const connectors = {
  injected: {},
};

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider connectors={connectors} supportedChainIds={supportedChainIds}>
      <div className="landing">
        <App />
      </div>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
