export const SET_PAGE_HEADER = "SET_PAGE_HEADER"

export const setHeader = text => {
    return {
        type: SET_PAGE_HEADER,
        text
    };
}