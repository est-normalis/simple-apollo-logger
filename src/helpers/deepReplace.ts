const deepReplace = (
  obj: any,
  searchedKey: string,
  replacementString: string
) => {
  if (typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        deepReplace(obj[key], searchedKey, replacementString)
      } else if (typeof value === 'string' && key === searchedKey) {
        obj[key] = replacementString
      }
    }
  }
}

export default deepReplace
