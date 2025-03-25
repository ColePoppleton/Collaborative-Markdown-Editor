import { createStore } from 'vuex';

export default createStore({
    state: {
        documentContent: '',
        userToken: localStorage.getItem('token') || null,
    },
    mutations: {
        setDocumentContent(state, content) {
            state.documentContent = content;
        },
        setUserToken(state, token) {
            state.userToken = token;
            localStorage.setItem('token', token);
        },
        clearUserToken(state) {
            state.userToken = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        updateDocumentContent({ commit }, content) {
            commit('setDocumentContent', content);
        },
        login({ commit }, token) {
            commit('setUserToken', token);
        },
        logout({ commit }) {
            commit('clearUserToken');
        }
    },
    getters: {
        isLoggedIn: state => !!state.userToken,
        getDocumentContent: state => state.documentContent,
    }
});