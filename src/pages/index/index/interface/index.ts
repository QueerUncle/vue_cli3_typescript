/**
 @Author: lize
 @Date: 2020/6/3
 @Description :
 @Parames :
 @Example :
 @Last Modified by: lize
 @Last Modified time: 2020/6/3
 **/

// import '../enum'
//TsPractice
interface GenericIdentityFn {
    <T>(arg: T): T;
}
interface Lengthwise {
    length: number;
}
interface Square {
    kind: ShapeKind;
    // kind: ShapeKind.Square;
    sideLength: number;
}
const objtest: Square = {
    kind:45,
    sideLength:1
}
console.log(objtest,'objtestobjtestobjtestobjtestobjtestobjtestobjtest')
