import Moment from 'moment'

export default class Logger {
    static log(message) {
        console.log(Moment().format())
        console.log(message)
    }
}