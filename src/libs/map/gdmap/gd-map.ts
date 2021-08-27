/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import AMapLoader from '@amap/amap-jsapi-loader'
import MapInterface,{MapOption} from '../map-core'
import Marker from '../map-marker'
import CanvasLayer from '../map-canvaslayer'
import MapUtils from '../map-utils'
import {MapInstance} from '../map-object'
import {MapType,Coordinates2D,OverlayZindex,ZoomValue,HeatMapData,WMSProtocol,WMTSProtocol,CustomTile,ThreeDimension} from '../common'
import Logger from '../../../utils/logger'
import UUID from '../../../utils/uuid'

export const DEFAULT_CONFIG = {
  version: '2.0',
  hostAndPath: 'webapi.amap.com/maps',
  key: 'f97efc35164149d0c0f299e7a8adb3d2',
  callback:'',
  mapStyle:''
}


class GDMap implements MapInterface {
  map!: MapInstance;
  version:string = DEFAULT_CONFIG.version;
  token: string = DEFAULT_CONFIG.key;
  config:object;
  protocol:string;
  options?:MapOption;//初始化参数，zoom，plugin，center，layer etc
  loadPromise:Promise<any>

  loadState:boolean = false
  utils?:MapUtils

  private _markers:{[name:string]:Marker} = {}
  private _amap:any = null
  private _canvasStarted = false
  private log = Logger('GDMap')
  private _heatMap:any = null
  private _contextMenu:any = null
  private _3Dlayer:{[name:string]:any} = {}
  private _3DObject:{[name:string]:any} = {}

  constructor(mapKey:string,options?:MapOption){
    this.token = mapKey
    if(options && options.version){
       this.version = options.version
    }


    this.options = options
    this.config = { ...DEFAULT_CONFIG}
    this.protocol = window.location.protocol
    if (this.protocol.indexOf(':') === -1) {
      this.protocol += ':'
    }

    this.loadPromise = this.load().then((AMap) => {
      this.log.info('initial map instance ...')
      this.map = new MapInstance(MapType.Gaode)
      this.map.originInstance = AMap
      this.map.id = UUID.get()
      this.map.version = this.version
      this.utils = new MapUtils(this)
      return this.map
    }).catch(e => {
      this.log.error(e)
      throw new Error(e)
    })

  }

 public get center():Coordinates2D  {
   const lnglat = this._amap.getCenter()
   return {lattitude:lnglat.lat,longitude:lnglat.lng} as Coordinates2D
 }
 public set center(value:Coordinates2D) {
   this.center = value
 }
  // 地图异步加载
  private load = () => {
    let heatMapPlug = 'AMap.HeatMap'
    if(this.version != '2.0'){
      heatMapPlug = 'AMap.Heatmap'
    }
    return AMapLoader.load({
        "key": this.token,
        "version": this.version,//缺省时默认为2.0
        "plugins": this.options?.plugins ? this.options.plugins:['AMap.MoveAnimation','AMap.Geocoder','AMap.CustomLayer',heatMapPlug,'AMap.GltfLoader','AMap.Walking','AMap.Driving','AMap.Map3D','AMap.3DTilesLayer']  //插件列表
    })
  }

  // 创建单个地图实例，随组件一起销毁
  public createInstance = (
    wrapper:HTMLDivElement,
    options?:MapOption,
    id?:string
  ) => {
    if(this.loadPromise){
        const p = this.loadPromise
          .then((map) => {
            const AMapLib = map.originInstance
            this._amap = new AMapLib.Map(wrapper,{
              viewMode: options?.viewMode && options.viewMode,
              center:options?.center && [options.center.longitude,options.center.lattitude],
              zoom:options?.zoom ? options.zoom:ZoomValue.Large,
              mapStyle:DEFAULT_CONFIG.mapStyle,
              rotateEnable:options?.rotateEnable ? options.rotateEnable:false
            });
            this.map.originMapObject = this._amap
            this.loadState = true
            return true
          }).catch(e => {
            this.log.error(e)
            throw new Error(e)
          })
        return p
    }else{
      return Promise.reject()
    }
  }

  // 地图图块加载完成后触发
  public onload = () => {
    let self = this
    const p = new Promise<MapInstance>(resolve =>{
        if(this.loadPromise){
          this.loadPromise.then(map => {
            resolve(map)
          }).catch(e => {
            this.log.error(e)
          })
        }else{
          return Promise.reject()
        }

    })
    return p

  }

  //添加标记
  public addMarker = (marker:Marker) => {
    this.loadPromise.then(amap =>{
      if(!marker.getInstance){
        this.log.error('the marker instance are null')
        return
      }
      this.log.info('add marker',marker)
      this._amap.add(marker.getInstance())
      if(!marker.id){
        marker.id = UUID.get()
      }
      this._markers[marker.id] = marker
    })

  }

  public removeMarker = (marker:Marker) => {
    this.loadPromise.then(amap =>{
      console.log('remove marker')
      if(!marker.getInstance){
        this.log.error('the marker instance are null')
        return
      }
      this.log.info('remove marker',marker)
      this._amap.remove(marker.getInstance())
    })

  }

  public getMarkers = (id:string)=>{
    return this._markers[id];
  }

  //移动地图
  public moveTo = (position:Coordinates2D) => {
    if(this.map){
      if(isNaN(position.longitude) || isNaN(position.lattitude)){
        this.log.error('position is NaN ',position)
        return
      }
      this._amap.panTo([position.longitude,position.lattitude], null)
    }

  }

  //设置旋转地图
  public setRotation = (degree?:number) => {
    if(degree != undefined){
      this._amap.setRotation(degree)
    }
  }

  public getRotation = () => {
    return this._amap.getRotation()
  }

  public addCanvasLayer = (canvas:HTMLCanvasElement,drawer?:()=>void) =>{
    if(this.map){
      const AMap = this.map.originInstance
      let canvasLayer = new AMap.CustomLayer(canvas,{
        zIndex: OverlayZindex.Low,
        zooms: [ZoomValue.Tiny, ZoomValue.Huge],
        alwaysRender:false,
      });
      const size = this._amap.getSize();//resize
      const width = size.width;
      const height = size.height;

      canvas.style.width = width+'px'
      canvas.style.height = height+'px'

      if(drawer){
        canvasLayer.render = ()=>{
          canvas.width = width;
          canvas.height = height;//清除画布
          drawer()
          if(drawer && !this._canvasStarted){

            this._canvasStarted = true
          }
        };

      }

      canvasLayer.setMap(this._amap)

      return new CanvasLayer({map:this.map,layerObject:canvasLayer})
    }
  }

  removeCanvasLayer = (layer:CanvasLayer) => {
    if(layer.layerObject.hide){
      layer.layerObject.hide()
    }
  };

  private _makeTile = (url:string,params:WMSProtocol|WMTSProtocol|CustomTile) =>{
    const AMap = this.map.originInstance
    const type = params.TYPE
    let layer:any = null
    delete params.TYPE

    switch(type){
      case 'WMTS':
        layer = new AMap.TileLayer.WMTS({
          url: url, // wmts服务的url地址
          blend: false, // 地图级别切换时，不同级别的图片是否进行混合
          zooms:[0,20],
          tileSize:256,
          params: params // OGC标准的WMS地图服务的GetMap接口的参数
        })
      break;
      case 'WMS':
        layer = new AMap.TileLayer.WMS({
          url: url, // wms服务的url地址
          blend: false, // 地图级别切换时，不同级别的图片是否进行混合
          zooms:[0,20],
          tileSize:256,
          params: params // OGC标准的WMS地图服务的GetMap接口的参数
        })
      break;
      case 'Custome':
      console.log(url)
      const val = params as CustomTile
        layer = new AMap.TileLayer({
          zIndex: 1,
          tileUrl:`${url}?layer=${val.LAYER}&TileMatrix=EPSG:3857:[z]&TileMatrixSet=EPSG:3857&Request=GetTile&Service=WMTS&Format=image/png&TileRow=[y]&TileCol=[x]`,
        })
      break;
      default:
      console.log('invalid tiles')
      break;
    }
    if(layer){
      layer.setMap(this._amap)
      layer.show()
    }
  }


  public addTileLayer = (tileUrl:string,params:WMSProtocol|WMSProtocol[]|WMTSProtocol|WMTSProtocol[],zIndex?:number) => {
    if(this.map){
      if(Array.isArray(params)){
        params.forEach((item:WMSProtocol|WMTSProtocol) => {
          this._makeTile(tileUrl,item)
        })
      }else{
        this._makeTile(tileUrl,params)
      }
    }
  }

//   public addTileLayer = (tileUrl:string,params:WMSProtocol|WMSProtocol[],zIndex?:number) => {
//     if(this.map){
//       const AMap = this.map.originInstance
//       if(Array.isArray(params)){
//         params.forEach(item => {
//
//
//           const layer  = new AMap.TileLayer.WMS({
//             url: tileUrl, // wms服务的url地址
//             blend: false, // 地图级别切换时，不同级别的图片是否进行混合
//             zooms:[0,20],
//             tileSize:256,
//             params: item // OGC标准的WMS地图服务的GetMap接口的参数
//           })
//           layer.setMap(this._amap)
//           layer.show()
//         })
//       }else{
//         const wms = new AMap.TileLayer({
//                 zIndex: 1,
//                 tileUrl: 'http://172.16.5.138:3003/geoserver/gwc/service/wmts?layer=ezhou:EZMap&TileMatrix=EPSG:3857:[z]&TileMatrixSet=EPSG:3857&Request=GetTile&Service=WMTS&Format=image/png&TileRow=[y]&TileCol=[x]'
//               })
//         // const wms  = new AMap.TileLayer.WMS({
//         //   url: tileUrl, // wms服务的url地址
//         //   blend: false, // 地图级别切换时，不同级别的图片是否进行混合
//         //   zooms:[0,20],
//         //   tileSize:256,
//         //   params: params // OGC标准的WMS地图服务的GetMap接口的参数
//         // })
//         wms.setMap(this._amap)
//         wms.show()
//       }
//   }
// }

  public addHeatMapData = (data:HeatMapData) => {
    this._setHeatmapData(data).then(value => {
      this._heatMap.setDataSet(value);
      this._heatMap.show()
    }).catch(err =>{

    })

  }


  public addEventListener = (event:string,handle:(e:MapInterface)=>void) => {
    this._amap.on(event,(e:any)=>{
      handle(this)
    },this)
  };
  public removeEventListener = (event:string,handle:(e:MapInterface)=>void) => {
    this._amap.off(event,handle,this)
  };

  public addMenu = (name:string,index:number,handle:(e:MapInterface,context?:any)=>void,onOpen?:(e:{pos:Coordinates2D})=>void,extra?:any)=>{
    // if(this._contextMenu == null){
    //   const AMap = this.map.originInstance
    //   this._contextMenu = new AMap.ContextMenu();
    //   this._amap.on('rightclick',(e:any)=>{
    //     this._contextMenu.open(this._amap, e.lnglat);
    //     if(onOpen){
    //       onOpen({pos:e.lnglat})
    //     }
    //   })
    // }
    //
    // this._contextMenu!.addItem(name,()=>{
    //   handle(this,extra)
    // },index)
  }

  public setZoom = (zoom:Number) =>{
    if(this._amap){
      this._amap.setZoom(zoom, false)
    }

  }

  public getZoom = ()=>{
    if(this._amap){
      return this._amap.getZoom() as number
    }else{
      return -1
    }
  }

  private _setHeatmapData = (data:HeatMapData) =>{
    return new Promise((resolve,reject) =>{
      if(this.map){
        if(this._heatMap == null){
          const AMap = this.map.originInstance
          const HeatMapLib = this.version == '2.0' ? AMap.HeatMap:AMap.Heatmap
          this._heatMap = new HeatMapLib(this._amap, {
                radius: 25, //给定半径
                opacity: [0, 1],

                gradient:{
                    0.5: 'blue',
                    0.65: 'rgb(117,211,248)',
                    0.7: 'rgb(0, 255, 0)',
                    0.9: '#ffea00',
                    1.0: 'red'
                }

          });
        }
        if(data && data.length > 0){
          const heatData = data.map(item =>{
            let gdCords = item.position
            if(this.utils){
             gdCords = MapUtils.ws84tojc02(item.position)
            }
            const val= {
              "lng": gdCords.longitude,
              "lat": gdCords.lattitude,
              "count": item.count
            }

            return val
          })

          const value = {
             data: heatData,
             max: data ? data[0].max:1
          }
          resolve(value)
        }else{
          if(this._heatMap.getDataSet()){
            this._heatMap.hide()
          }
        }

      }else{
        reject()
      }
    })
  }

  public add3DModel(options:ThreeDimension,id?:string){

    if(options.gltf && this.version != '2.0'){
      this._addGltfModel(options)
    }

    if(options.tileUrl  && this.version == '2.0'){
      this._add3DTiles(options)
    }

  }

  public searchDrivingPath(dst:Coordinates2D,ori:Coordinates2D){
    const AMap = this.map.originInstance
    const driving = new AMap.Driving({
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.DrivingPolicy.LEAST_DISTANCE,
    })

    const startLngLat = new AMap.LngLat(ori.longitude, ori.lattitude)
    const endLngLat = new AMap.LngLat(dst.longitude, dst.lattitude)
    return new Promise<any>((reslove,reject) =>{
      driving.search(startLngLat, endLngLat, (status:'complete'|'error'|'no_data', result:any) =>  {
        // 未出错时，result即是对应的路线规划方案
        if(status == 'complete'){
          if(Array.isArray(result.routes) ){
            console.log(result.routes)
            const path = result.routes.map((item:any) => {
              return item.steps.map((step:any) => {
                return step.tmcs.map((tmc:any) => tmc.polyline)
              })
            })
            let newArr:any[] = []
            let res:any[] = []
            for(var i = 0; i < path.length; i++)
            {
                newArr = path[i].map((item:any) => item.map((subitem:string) => subitem.split(";")))
            }
            for(var i = 0; i < newArr.length; i++)
            {
                res = res.concat(...newArr[i])
            }
            reslove(res.map((item:string) => {
              const pos = item.split(',')
              return {longitude:pos[0],lattitude:pos[1]}
            }))
          }else{
            reslove([])
          }

        }else{
          reject(status)
        }
      })
    })

  }

  public searchWalkingPath(dst:Coordinates2D,ori:Coordinates2D){
    const AMap = this.map.originInstance
    const driving = new AMap.Walking({
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.DrivingPolicy.LEAST_DISTANCE,
    })

    const startLngLat = new AMap.LngLat(ori.longitude, ori.lattitude)
    const endLngLat = new AMap.LngLat(dst.longitude, dst.lattitude)
    return new Promise<any>((reslove,reject) =>{
      driving.search(startLngLat, endLngLat, (status:'complete'|'error'|'no_data', result:any) =>  {
          console.log(result)
        // 未出错时，result即是对应的路线规划方案
        if(status == 'complete'){
          if(Array.isArray(result.routes) ){

            const path = result.routes.map((item:any) => {
              return item.steps.map((step:any) => {
                return step.path.map((val:any) => {return {longitude:val.lng,lattitude:val.lat}})
              })
            })
            let newArr:any[] = []

            for(var i = 0; i < path.length; i++)
            {
                newArr = newArr.concat(...path[i])
            }
            // for(var i = 0; i < newArr.length; i++)
            // {
            //     res = res.concat(...newArr[i])
            // }
            reslove(newArr)
            // reslove(res.map((item:string) => {
            //   const pos = item.split(',')
            //   return {longitude:pos[0],lattitude:pos[1]}
            // }))
          }else{
            reslove([])
          }

        }else{
          reject(status)
        }
      })
    })

  }
  private _add3DTiles(options:ThreeDimension){
    const AMap = this.map.originInstance
    const map = this._amap
    const tiles = new AMap['3DTilesLayer']({
        map: map,
        url: options.tileUrl, // 3d Tiles 入口文件

    });
  }

  private _addGltfModel(params:ThreeDimension){
    const AMap = this.map.originInstance
    const map = this._amap
    const that = this
    var object3Dlayer = new AMap.Object3DLayer();
    map.add(object3Dlayer);
    let posOffest = this.utils!.convertGPS(params.option.position)
    // this._left(,16.9)
    // posOffest = this._bottom(posOffest,12.3)
    // 加载AMap.GltfLoader插件
    // 创建AMap.GltfLoader插件实例
    var gltf = new AMap.GltfLoader();

    // 调用load方法，加载 glTF 模型资源
    var urlDuck = params.gltf;  // 模型资源文件路径，远程/本地文件均可
    gltf.load(urlDuck, function( obj:any ){
       //  为解析后的gltf对象
       obj.setOption({...params.option,position:new AMap.LngLat(posOffest.longitude, posOffest.lattitude)});
       obj.rotateX(90);

       object3Dlayer.add(obj);
       that._3DObject[`${params.gltf}`] = obj
    });

    if(!this._3Dlayer[`${params.gltf}`]){
      this._3Dlayer[`${params.gltf}`] = object3Dlayer
    }
  }

  public set3DModelOption(key:string,options:{position:Coordinates2D;scale:number;height:number}){
    let posOffest = this.utils!.convertGPS(options.position)
    const AMap = this.map.originInstance
    this._3Dlayer[key].remove(this._3DObject[key])
    this._3DObject[key].setOption({...options,position:new AMap.LngLat(posOffest.longitude, posOffest.lattitude)})
    this._3Dlayer[key].add(this._3DObject[key])
    console.log('update:',options)
  }
  //异步加载在线Map
  private _getScriptSrc(cfg:(typeof DEFAULT_CONFIG)) {
    return `${this.protocol}//${cfg.hostAndPath}?v=${cfg.version}&key=${cfg.key}&callback=${cfg.callback}`
  }

  private _buildScriptTag(src:string) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = src
    return script
  }

  public asyncLoad(){
    // if (typeof window === 'undefined') {
    //   return null
    // }
    // const mapTask = this._createMapPromise()
    // return new Promise(resolve => {
    //   mapTask.then(() => {
    //     resolve()
    //   })
    // })
  }

  private _createMapPromise() {
     // if (window.AMap) {
     //   return Promise.resolve()
     // }
     // const script = this._buildScriptTag(this._getScriptSrc(this.config))
     // const p = new Promise(resolve => {
     //   window[this.config.callback] = () => {
     //     resolve()
     //     delete window[this.config.callback]
     //   }
     // })
     // document.body.appendChild(script)
     // return p
   }

}
export default GDMap
