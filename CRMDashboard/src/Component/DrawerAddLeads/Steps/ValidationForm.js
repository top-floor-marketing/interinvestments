
// eslint-disable-next-line no-useless-escape
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const firstNameValidation = (value) => {
    if (!value.length) {
        return 'Name clien is required'
    }
    return null
}

const lastNameValidation = (value) => {
    if (!value.length) {
        return 'last Name client is required'
    }
    return null
}


const emailValidation = (value) => {
    const validEmail = regexEmail.test(value)

    if (!value.length) {
        return 'Please fill in the following field Email'
    }

    if (!validEmail) {
        return 'Email must be a valid email'
    }
    return null
}

const otherEmailValidation = (value) => {
    const validEmail = regexEmail.test(value)

    if (!validEmail) {
        return 'Email must be a valid email'
    }
    return null
}


const phoneNumberValidation = (value) => {
    if (!value) {
        return 'Please fill in the following field phone Number'
    }
}

const noteValidation = (value) => {
    if (!value.length) {
        return 'Please fill in the following field Note'
    }

    if(value.length <= 11) {
        return 'Message Contact length must be at least 12 characters long'
    }
}


export {
    firstNameValidation,
    lastNameValidation,
    emailValidation,
    otherEmailValidation,
    noteValidation,
    phoneNumberValidation
}