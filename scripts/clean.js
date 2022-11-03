/*
 * Strip tracking query strings
 * */

;(function () {
  CREEPY_SITES = ["instagram.com", "twitter.com"]

  app.helpers.clean = text => {
    return text.stripLinkPrefix().stripQueryString()
  }

  String.prototype.stripLinkPrefix = function () {
    const string = this
    return string.replace(/(https?:\/\/|www.)/g, "")
  }

  String.prototype.stripQueryString = function () {
    if (CREEPY_SITES.some(s => this.match(new RegExp(s)))) {
      const string = this
      return string.replace(/\?.*$/, "")
    } else {
      return this
    }
  }
})()
