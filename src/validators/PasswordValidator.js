const validatePassword = (rule, value, callback) => {
    
    if (value.length === 0) {
        callback('Введите пароль')
    } else if (value.length < 5) {
        callback('Слишком короткий пароль')
    }

    callback()
}

export default validatePassword