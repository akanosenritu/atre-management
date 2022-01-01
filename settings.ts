export const getUrl = (functionName: string) => {
  if (process.env.NODE_ENV === "development") {
    return `${developmentUrlScheme}://${developmentUrlHostName}/api/${functionName}`
  }
  return `${productionUrlScheme}://${productionUrlHostName}/api/${functionName}`
}

// development related things
export const developmentUrlScheme = "http"
export const developmentUrlHostName = "localhost:7071"
export const productionUrlScheme = "https"
export const productionUrlHostName = "atre.azurewebsites.net"

// janCodesDictionary related
export const janCodesDictionaryFileUrl =  "https://atre.blob.core.windows.net/settings/janCodesDictionary.json"
export const getJanDictionaryFromGoogleSpreadsheetsUrl = getUrl("getJanDictionaryFromGoogleSpreadsheets")
export const updateJanDictionaryUrl = getUrl("updateJanDictionary")

// writeInConfigurations related
export const writeInConfigurationsFileUrl = "https://atre.blob.core.windows.net/settings/writeInConfigurations.json"
export const getWriteInConfigurationsFromGoogleSpreadsheetsUrl = getUrl("getWriteInConfigurationsFromGoogleSpreadsheets")
export const updateWriteInConfigurationsUrl = getUrl("updateWriteInConfigurations")
