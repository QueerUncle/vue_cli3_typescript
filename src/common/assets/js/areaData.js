/*
  @Author: lize
  @Date: 2020/8/9
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/8/9
 */
import AreaData from 'area-data';
class areaData { // eslint-disable-line
    constructor() {
        const proList = AreaData.pcaa[86];
        const newAry = [];
        for(const i in proList){
            const pro = {
                value: i,
                label: proList[i],
                children: [],
            };
            const cityList = AreaData.pcaa[i];
            for(const j in cityList){
                const city = {
                    value: j,
                    label: cityList[j],
                    children: [],
                }
                pro.children.push(city);
                const areaList = AreaData.pcaa[j];
                for(const o in areaList){
                    const area = {
                        value: o,
                        label: areaList[o],
                        children: [],
                    }
                    city.children.push(area);
                }
            }
            newAry.push(pro)
        }
        console.log(newAry);
        this.data = newAry;
        return newAry;
    }
}
export default new areaData();
