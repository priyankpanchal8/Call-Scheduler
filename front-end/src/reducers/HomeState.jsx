import { SET_PAGE_HEADER } from '../actions/HomePage'

const HomeState = (state = { currentHeaderText: "", breadcrumbs: [] }, action) => {
    switch (action.type) {
        case SET_PAGE_HEADER:
            return { ...state, currentHeaderText: action.text };
            break;
        default:
            return state;
            break;
    }
}
export default HomeState