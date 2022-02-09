import NetworkApi from '../libs/network/d'

interface BasicDeptarment{
        id: string,
        dept_no: string,
        dept_name: string,

}
interface Deptarment extends BasicDeptarment{
    stuff_num: number
}
class DeptNetwork{
  private network:NetworkApi
  rootPath = 'sys/dept'
  constructor(network:NetworkApi){
    this.network = network
  }

  public get = () => {
    return this.network.getItem<Array<Deptarment>>(this.rootPath)
  }

  public update = (params:BasicDeptarment) => {
    return this.network.postItem(this.rootPath,params)
  }

  public delete = <T extends { [name: string]: any; } | null>(id:string) => {
    return this.network.delItem(this.rootPath+'/'+id)
  }



}

const DeptApi = (network: NetworkApi) => new DeptNetwork(network);

export default DeptApi
