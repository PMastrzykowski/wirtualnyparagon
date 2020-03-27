
export const landingEditField = (data) => {
    return {
        type: 'LANDING_EDIT_FIELD',
        data
    }
}
export const landingValidate = (errors, valid) => {
    return {
        type: 'LANDING_VALIDATE',
        payload: {
            errors,
            valid 
        }
    }
}
export const landingSetStatus = (status) => {
    return {
        type: 'LANDING_SET_STATUS',
        status
    }
}