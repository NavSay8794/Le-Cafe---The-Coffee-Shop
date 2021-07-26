const express = require('express')

const dateMapper = () => {
    let tempDate = new Date()
    let currentDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
    let orderTime = `${tempDate.getHours()}:${tempDate.getMinutes()}`
    return {
        currentDate,
        orderTime
    }
}

module.exports = {
    dateMapper
}