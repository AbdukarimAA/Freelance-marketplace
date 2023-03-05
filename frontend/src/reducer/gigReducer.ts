import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface IInitialState {
    userId: string,
    title: string,
    cat: string,
    cover: string,
    images: any[],
    desc: string,
    shortTitle: string,
    shortDesc: string,
    deliveryTime: number,
    revisionNumber: number,
    features: any[],
    price: number,
}

export const INITIAL_STATE: IInitialState = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    cat: "",
    cover: "",
    images: [],
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: 0,
};

export const gigReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case "ADD_IMAGES":
            return {
                ...state,
                cover: action.payload.cover,
                images: [...state.images, action.payload.images],
            };
        case "ADD_FEATURE":
            return {
                ...state,
                features: [...state.features, action.payload],
            };
        case "REMOVE_FEATURE":
            return {
                ...state,
                features: state.features.filter(
                    (feature) => feature !== action.payload
                ),
            };

        default:
            return state;
    }
};