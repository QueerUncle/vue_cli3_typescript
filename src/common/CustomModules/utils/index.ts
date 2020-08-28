/*
  @Author: lize
  @Date: 2020/7/18
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/7/18
 */
class UtilsTools {
    a(){
        console.log('b');
    }

    // 获取uuid
    uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
            const r = Math.random() * 16 | 0; // eslint-disable-line
            let v = c ==  'x'  ? r : (r & 0x3 | 0x8); // eslint-disable-line
            return v.toString(16);
        });
    }
}
export default new UtilsTools();
