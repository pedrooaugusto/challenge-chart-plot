import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * @desc The whole applicaiton renders without crash,
 * theres a catch tough, ChartJS cannont render properly
 * without a valid canvas... So I just exclude him from 
 * the test.
 */
it('The whole application renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App test = {true}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});