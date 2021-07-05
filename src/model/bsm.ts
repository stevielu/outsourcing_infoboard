export enum BSMDataSource  {
  RSU = 1,
  OBU = 2,
  MEC = 3,
  OSP = 4
}
export interface BasicOBU<T> {
  device_id:string;
  time_stamp:number;
  data:T;
  data_source:BSMDataSource;
}

export interface BSM {
  heading:number;
  speed:number;
  id:number;
  pos:{
    elevation:number;
    lat:string;
    long_:string;
  };
  vehicleClass:{
    classification:number;
    fuelType:number;
  }
}

export interface OBUStatus {
  auzcode_devname:string;
  car_profile:{
    plate_number:string;
    vehicle_type:number;
    vin_number:number;
  }
  drive_time:number;
  motion:{
    heading:number;
    speed:number;
  }
  position_3d:{
    elevation:string;
    latitude:string;
    longitude:string;
  }
}

export interface Vehicle{
    vid: string;
		taskid: number;
		status:number;
		heading: number;
    acceleration: number;
	  longitude: number;
		latitude: number;
		gear: number;
		speed: number;
		oilleft: number;
		wheel: number;
		power: number;
		light: number;
		abs: number;
}
