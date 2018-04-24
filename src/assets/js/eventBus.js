/* eslint-disable */
import Vue from 'vue';

/*
  The eventBus is used to communicate among components.
  Two main uses are to emit messages to the error component
  and to redraw charts after completing an action.
*/

export const eventBus = new Vue();
