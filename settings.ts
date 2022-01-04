export const getUrl = (functionName: string) => {
  return `/api/azure/${functionName}`
}

// janCodesDictionary related
export const janCodesDictionaryFileUrl =  "https://atre.blob.core.windows.net/settings/janCodesDictionary.json"
export const getJanDictionaryFromGoogleSpreadsheetsUrl = getUrl("getJanDictionaryFromGoogleSpreadsheets")
export const updateJanDictionaryUrl = getUrl("updateJanDictionary")

// writeInConfigurations related
export const writeInConfigurationsFileUrl = "https://atre.blob.core.windows.net/settings/writeInConfigurations.json"
export const getWriteInConfigurationsFromGoogleSpreadsheetsUrl = getUrl("getWriteInConfigurationsFromGoogleSpreadsheets")
export const updateWriteInConfigurationsUrl = getUrl("updateWriteInConfigurations")
