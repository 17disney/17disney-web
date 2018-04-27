import L from 'leaflet'
L.TileLayer.WebDogTileLayer = L.TileLayer.extend({
  getTileUrl: function (tilePoint) {
    var urlArgs,
      getUrlArgs = this.options.getUrlArgs

    if (getUrlArgs) {
      var urlArgs = getUrlArgs(tilePoint)
    } else {
      urlArgs = {
        z: tilePoint.z,
        x: tilePoint.x,
        y: tilePoint.y
      }
    }
    return L.Util.template(this._url, L.extend(urlArgs, this.options, { s: this._getSubdomain(tilePoint) }))
  }
})

L.tileLayer.webdogTileLayer = function (url, options) {
  return new L.TileLayer.WebDogTileLayer(url, options)
}

export default L.tileLayer.webdogTileLayer
