const initialState = {
    valid: true,
    status: 'ready',
    fields: {
        email: ''
    },
    errors: {
        email: ''
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LANDING_EDIT_FIELD':
            return {
                ...state,
                fields: {
                    ...state.fields,
                    ...action.data
                }
            }
        case 'LANDING_VALIDATE':
            return {
                ...state,
                errors: {
                    ...state.fields,
                    ...action.payload.errors
                },
                valid: action.payload.valid
            }
        case 'LANDING_SET_STATUS':
            return {
                ...state,
                status: action.status,
                fields: {
                    email: action.status === 'subscribed' ? initialState.fields.email : state.fields.email
                }
            }
        default:
            return state;
    }
}