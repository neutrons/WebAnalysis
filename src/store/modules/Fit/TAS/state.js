import state from '../state';
import fits from '../../../fits/TAS';

state.label = {
  x: 'x',
  y: 'y',
};

state.fit = { ...fits };

state.field = {
  x: 'x',
  y: 'y',
};

state.fits = { ...fits };

state.isFieldChange = false;

export default state;
