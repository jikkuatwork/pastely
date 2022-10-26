;(function () {
  app.helpers.clean = text => {
    return text.stripLinkPrefix().stripQueryString()
  }

  String.prototype.stripLinkPrefix = function () {
    const string = this
    return string.replace(/(https?:\/\/|www.)/g, "")
  }

  String.prototype.stripQueryString = function () {
    const string = this
    return string.replace(/\?.*$/, "")
  }
})()
