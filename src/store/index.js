import Vuex from "vuex";
import Vue from 'vue';
import usersModule from './Users';

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        
        users: usersModule,
        
    }
});

