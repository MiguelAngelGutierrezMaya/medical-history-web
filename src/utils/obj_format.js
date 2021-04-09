export const ObjFormat = {
  snakeCase: (data) => {
    let json = {}
    Object.keys(data).forEach((key) => {
      json[key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)] = data[key]
    })

    return json
  },
  camelCase: (obj) => {
    var newObj = {}
    for (let d in obj) {
      if (obj.hasOwnProperty(d)) {
        newObj[
          d.replace(/(_\w)/g, function (k) {
            return k[1].toUpperCase()
          })
        ] = obj[d]
      }
    }
    return newObj
  },
}
