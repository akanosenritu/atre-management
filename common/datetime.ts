import * as luxon from "luxon"

export const getNow = (): luxon.DateTime => {
  return luxon.DateTime.now().setZone("Asia/Tokyo")
}

export const getTodayString = (format?: string): string => {
  const now = getNow()
  if (format) {
    return now.toFormat(format)
  } else {
    return now.toFormat("yyyy-MM-dd")
  }
}

export const getThisHourString = (format?: string): string => {
  const now = getNow()
  if (format) {
    return now.toFormat(format)
  } else {
    return now.toFormat("yyyy-MM-dd_HH")
  }
}

export const getNowString = (format?: string): string => {
  const now = getNow()
  if (format) {
    return now.toFormat(format)
  } else {
    return now.toISO()
  }
}

export const getNowStringExcaped = (): string => {
  const now = getNow()
  return now.toISO().replace(/:/g, "_")
}

export const isValidDayString = (dayString: string): boolean => {
  const dateTime = luxon.DateTime.fromISO(dayString)
  return dateTime.isValid
}