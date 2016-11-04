class Helper {
  getListError (object) {
    var listError = []
    for (var propt in object) {
      if (object[propt] instanceof Array) {
        object[propt].forEach(function (item) {
          listError.push(item)
        })
      }
      else {
        listError.push(object[propt])
      }
    }
    return listError
  }

  formatAsHtmlList (list) {
    let strResp = '<ul>'
    list.forEach(function (item) {
      strResp += '<li>' + item + '</li>'
    })
    strResp += '</ul>'

    return strResp
  }
}

const helper = new Helper()

export default helper
