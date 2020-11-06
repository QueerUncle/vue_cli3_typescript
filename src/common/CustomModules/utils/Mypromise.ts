/*
  @Author: lize
  @Date: 2020/7/18
  @Description :  Promise 实现
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/7/18
 */
//Promise/A+规范的三种状态
const PENDING: string = 'pending';
const FULFILLED: string = 'fulfilled';
const REJECTED: string = 'rejected';
export default class MyPromise {
    _status: string;
    _resolveQueue: any;
    _rejectQueue: any;
    _value: any;

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    constructor(executor: any) {
        this._status = PENDING; // promise状态
        this._resolveQueue = []; // 成功的队列。resolve时触发；
        this._rejectQueue = []; // 失败的队列，reject时触发；

        // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
        const _resolve: Function = (val: any): any => {
            //把resolve执行回调的操作封装成一个函数,放进setTimeout里,以兼容executor是同步代码的情况
            const run = () => {
                if(this._status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
                this._status = FULFILLED              // 变更状态
                this._value = val                     // 储存当前value

                // 这里之所以使用一个队列来储存回调,是为了实现规范要求的 "then 方法可以被同一个 promise 调用多次"
                // 如果使用一个变量而非队列来储存回调,那么即使多次p1.then()也只会执行一次回调
                while(this._resolveQueue.length) {
                    const callback = this._resolveQueue.shift()
                    callback(val)
                }
            }
            setTimeout(run)
        }

        const _reject: Function = (val: any): any => {
            const run = () => {
                if(this._status !== PENDING) return   // 对应规范中的"状态只能由pending到fulfilled或rejected"
                this._status = REJECTED               // 变更状态
                this._value = val                     // 储存当前value
                while(this._rejectQueue.length) {
                    const callback = this._rejectQueue.shift()
                    callback(val)
                }
            }
            setTimeout(run)
        }
        // new Promise()时立即执行executor,并传入resolve和reject
        executor(_resolve, _reject);
    }
    // then方法,接收一个成功的回调和一个失败的回调
    then(resolveFn?: any, rejectFn?: any) {

        // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
        typeof resolveFn !== 'function' ? resolveFn = (value: any) => value : null
        typeof rejectFn !== 'function' ? rejectFn = (error: any) => error : null

        //return一个新的promise
        return new Promise((resolve, reject) => {
            //把resolveFn重新包装一下,再push进resolve执行队列,这是为了能够获取回调的返回值进行分类讨论
            const fulfilledFn = (value: any) => {
                try {
                    //执行第一个(当前的)Promise的成功回调,并获取返回值
                    const x = resolveFn(value)
                    //分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error)
                }
            }

            //reject同理
            const rejectedFn  = (error: any) => {
                try {
                    const x = rejectFn(error)
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                } catch (error) {
                    reject(error)
                }
            }

            switch (this._status) {
                // 当状态为pending时,把then回调push进resolve/reject执行队列,等待执行
                case PENDING:
                    this._resolveQueue.push(fulfilledFn)
                    this._rejectQueue.push(rejectedFn)
                    break;
                // 当状态已经变为resolve/reject时,直接执行then回调
                case FULFILLED:
                    fulfilledFn(this._value)    // this._value是上一个then回调return的值(见完整版代码)
                    break;
                case REJECTED:
                    rejectedFn(this._value)
                    break;
            }
        })
    }

    //catch方法其实就是执行一下then的第二个回调
    catch(rejectFn: any) {
        return this.then(undefined, rejectFn)
    }

    //finally方法
    finally(callback: Function) {
        return this.then(
            (value: any) => MyPromise.resolve(callback()).then(() => value),             // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
            (reason: any) => MyPromise.resolve(callback()).then(() => { throw reason })  // reject同理
        )
    }
    //静态的resolve方法
    static resolve(value: any) {
        if(value instanceof MyPromise) return value //根据规范, 如果参数是Promise实例, 直接return这个实例
        return new MyPromise((resolve: any) => resolve(value))
    }

    //静态的reject方法
    static reject(reason: any) {
        return new MyPromise((resolve: any, reject: any) => reject(reason))
    }
    //静态的all方法
    static all(promiseArr: object[]) {
        let index = 0
        const result: object[] = []
        return new MyPromise((resolve: any, reject: any) => {
            promiseArr.forEach((p, i) => {
                //Promise.resolve(p)用于处理传入值不为Promise的情况
                MyPromise.resolve(p).then(
                    (val: any) => {
                        index++
                        result[i] = val
                        if(index === promiseArr.length) {
                            resolve(result)
                        }
                    },
                    (err: any) => {
                        reject(err)
                    }
                )
            })
        })
    }
    //静态的race方法
    static race(promiseArr: object[]) {
        return new MyPromise((resolve: any, reject: any) => {
            //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
            for (const p of promiseArr) {
                Promise.resolve(p).then(  //Promise.resolve(p)用于处理传入值不为Promise的情况
                    value => {
                        resolve(value)        //注意这个resolve是上边new MyPromise的
                    },
                    err => {
                        reject(err)
                    }
                )
            }
        })
    }
}

const p1 = new MyPromise((resolve: any) =>{
    setTimeout(() =>{
        resolve(1);
    }, 1000)
})
p1
    .then((res: any) => {
        // console.log(res)
        return 2          //链式调用测试
    })
    .then()             //值穿透测试
    .then(res => {
        // console.log(res)
        return new MyPromise((resolve: any) => {
            resolve(3)      //返回Promise测试
        })
    })
    // .then(res => {
    //     console.log(res)
    //     throw new Error('reject测试')   //reject测试
    // })
    // .then( err => {
    //     console.log(err)
    // })
