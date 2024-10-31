export const goto = (path) => {
    window.history.pushState({}, "", path);
};
