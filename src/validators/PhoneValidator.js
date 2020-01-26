const validatePhone = (rule, value, callback) => {
    if (value.length === 0) {
        callback('Введите номер телефона')
    }
    else if (!value.match(/89[0-9]{9}$/)) {
        callback('Номер телефона введен неверно')
    }
    callback()
}

export default validatePhone