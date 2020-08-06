export const setLoading = (state, loading) => {
    state.loading = loading;
}

export const setIsMobile = (state, isMobile) => {
    state.isMobile = isMobile;
}

export const updateAddError = (state, error) => {
    state.errors.push(error);
}

export const resetErrors = (state) => {
    state.errors = [];
}