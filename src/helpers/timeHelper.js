import moment from 'moment'

export const timestampToTime = timestamp => moment(timestamp).format('MMM Do HH:ss')

export const timestampToDate = timestamp => moment(timestamp).format('MMM Do')

