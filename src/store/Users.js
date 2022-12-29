import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const state = () => ({
  users: [],
  auth: {},

});


const getters = {
  getUsers(state) {

    return state.users;
  },
  getAuth(state) {

    return state.auth;
  }

}

const mutations = {
  setUsers(state, payload) {

    state.users = payload;
    
  },

  setAuth(state, payload) {

    state.auth = payload;

  }
}

const actions = {
  async fetchUsers({ commit }) {

    let res = await axios.get(`${process.env.VUE_APP_API_URL}/usersall.php`);

    commit('setUsers', res.data.Users);


  },
  async Registration({ commit }, payload) {
    let res = await axios.post(`${process.env.VUE_APP_API_URL}/new_user.php`, payload);
    localStorage.setItem('auth', JSON.stringify(res.data.user));
    commit('setAuth', res.data.user[0]);


  },
  async Login({ commit }, payload) {

    let res = await axios.post(`${process.env.VUE_APP_API_URL}/login.php`, payload);


    if (res.data['auth'] == 'failed')
      return 0;
    else if (res.data['auth'] == 'none')
      return 2;
    else if (res.data['auth'] == 'passed') {
      localStorage.setItem('auth', JSON.stringify(res.data['controlno']));
      commit('setAuth', res.data);

      return 1;
    }
    else
      return 0;
  },
  async Deleteuser({ commit }, payload) {
    let res = await axios.post(`${process.env.VUE_APP_API_URL}/deleteuser.php`, payload);
    console.log("delete=>",res.data['deleted'] );
    console.log("res.data.users",res.data.Users);
    if (res.data['deleted'] == 'success') {
      commit('setUsers', res.data.Users);
      return 1;
    }
    else
      return 0;
  },
  async Updateuser({ commit }, payload) {
    let res = await axios.post(`${process.env.VUE_APP_API_URL}/edituser.php`, payload);
    console.log(res.data);
    if (res.data['output'] == 'success') {
      commit('setUsers', res.data.Users);
      return 1;
    }
    else
      return 0;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}