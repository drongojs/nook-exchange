import { createElement } from 'react';
import { render } from 'react-dom';
import './infrastructure/index';
import App from './presentation/components/App';

render(
  createElement(App),
  document.getElementById('root'),
);
