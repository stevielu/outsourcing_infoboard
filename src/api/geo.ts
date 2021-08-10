import NetworkApi from '../libs/network/d'
import GeoJSON from 'geojson'

class GeoNetwork{
  private network:NetworkApi

  constructor(network:NetworkApi){
    this.network = network
  }

  public polygon = <T extends { [name: string]: any; } | null>(url:string) => {
    return this.network.get<GeoJSON.FeatureCollection<GeoJSON.Polygon,T>>(url)
  }

  public multiPolygon = <T extends { [name: string]: any; } | null>(url:string) => {
    return this.network.get<GeoJSON.FeatureCollection<GeoJSON.MultiPolygon,T>>(url)
  }

  public point = <T extends { [name: string]: any; } | null>(url:string) => {
    return this.network.get<GeoJSON.FeatureCollection<GeoJSON.Point,T>>(url)
  }

  public multiPoint = <T extends { [name: string]: any; } | null>(url:string) => {
    return this.network.get<GeoJSON.FeatureCollection<GeoJSON.MultiPoint,T>>(url)
  }

  public lineString = <T extends { [name: string]: any; } | null>(url:string) => {
    return this.network.get<GeoJSON.FeatureCollection<GeoJSON.LineString,T>>(url)
  }

  public multiLineString = <T extends { [name: string]: any; } | null>(url:string) => {
    return this.network.get<GeoJSON.FeatureCollection<GeoJSON.MultiLineString,T>>(url)
  }

}

const GeoApi = (network: NetworkApi) => new GeoNetwork(network);

export default GeoApi
