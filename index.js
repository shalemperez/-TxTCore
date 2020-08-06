import BaseStore from 'BaseStore'
export const store = new Vuex.Store(Object.assign(
    {},
    BaseStore,
    { modules: { txtcore } }
));