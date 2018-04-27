import Proj from './proj4leaflet'

const baiduCRS = new Proj.CRS(
  'EPSG:900913',
  '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
  {
    resolutions: (() => {
      let level = 19
      var res = []
      res[0] = Math.pow(2, 18)
      for (var i = 1; i < level; i++) {
        res[i] = Math.pow(2, 18 - i)
      }

      return res
    })(),
    origin: [0, 0],
    bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
  }
)

export default baiduCRS
