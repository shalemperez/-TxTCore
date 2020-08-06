export const changeIsMobile = ({ commit }, isMobile) => {
    commit('setIsMobile', isMobile);
};

export const changeLoading = ({ commit }, loading) => {
    commit('setLoading', loading);
};

export const addError = ({ commit }, e) => {
    commit('updateAddError', e);
};

export const resetAllErrors = ({ commit }) => {
    commit('resetErrors');
};