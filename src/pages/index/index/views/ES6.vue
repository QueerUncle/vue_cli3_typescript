<!--
  @Author: lize
  @Date: 2020/8/18
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/8/18
 -->
<template>
    <div class="ES6-wrap main-wrap">
        <PageMenu/>
        <div class = "content-wrap">
            <h2>Proxy</h2>
            <pre>
                1、Proxy 用于修改某些操作的默认行为，可以理解成在目标对象之前架设一层拦截器。Vue3就应用到了Proxy，将原来的defineProperty替换掉。
                2、Proxy常有的方法，
                        get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']，
                        set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
                            （严格模式下，set代理返回false或者undefined，都会报错。）
                        apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
                        construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
                        has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。(has拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除。)
                        deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
                            （注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。）
                        Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
                             defineProperty()方法拦截了Object.defineProperty()操作。
                             var handler = {
                                  defineProperty (target, key, descriptor) {
                                    return false;
                                  }
                                };
                             var target = {};
                             var proxy = new Proxy(target, handler);
                             proxy.foo = 'bar' // 不会生效
                            上面代码中，defineProperty()方法内部没有任何操作，只返回false，导致添加新属性总是无效。注意，这里的false只是用来提示操作失败，本身并不能阻止添加新属性。
                            注意，如果目标对象不可扩展（non-extensible），则defineProperty()不能增加目标对象上不存在的属性，否则会报错。
                                另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty()方法不得改变这两个设置。
                        getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
                        getPrototypeOf()方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
                                Object.prototype.__proto__
                                Object.prototype.isPrototypeOf()
                                Object.getPrototypeOf()
                                Reflect.getPrototypeOf()
                                instanceof
                        isExtensible()方法拦截Object.isExtensible()操作。（这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。）
                        ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。ownKeys()方法还可以拦截Object.getOwnPropertyNames()。for...in循环也受到ownKeys()方法的拦截。
                                Object.getOwnPropertyNames()
                                Object.getOwnPropertySymbols()
                                Object.keys()
                                for...in循环
                                注意，使用Object.keys()方法时，有三类属性会被ownKeys()方法自动过滤，不会返回。
                                目标对象上不存在的属性
                                属性名为 Symbol 值
                                不可遍历（enumerable）的属性
                        preventExtensions()方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
                                这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
                                这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），proxy.preventExtensions才能返回true，否则会报错。
                        setPrototypeOf()方法主要用来拦截Object.setPrototypeOf()方法。（注意，该方法只能返回布尔值，否则会被自动转为布尔值。
                                另外，如果目标对象不可扩展（non-extensible），setPrototypeOf()方法不得改变目标对象的原型。）
                        Proxy.revocable()方法返回一个可取消的 Proxy 实例。
                3、Proxy--this问题
                        虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。
                                主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
                                const target = {
                                      m: function () {
                                        console.log(this === proxy);
                                      }
                                };
                                const handler = {};
                                const proxy = new Proxy(target, handler);
                                target.m() // false
                                proxy.m()  // true
                4、WEB服务的客户端
                        Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。（详情请见下面的示例 function proxyCreateDom()）;
            </pre>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        name: 'ES6',
    })
    export default class ES6 extends Vue {
        created(){
            this.init();
            this.testGet();
            this.testGet2();
            const arr: any = this.createArray('a', 'b', 'v');
            console.log(arr[-1]);
            this.proxyCreateDom();
            this.testClass();
            // console.log(this.add(1)(2)(3) + '', 'asdasdasdasdasda');

        }

        init(){
            const obj = new Proxy({a:1},{
                get(target: any, propKey: string, receiver: any){
                    console.log(target, propKey, receiver);
                    console.log(Reflect)
                    return target[propKey];
                },
            })
            console.log(obj.a)
        }

        testGet(){
            const person = {
                name: "张三"
            };
            const proxy = new Proxy(person, {
                get: function(target: any, propKey: string) {
                    if (propKey in target) {
                        return target[propKey];
                    } else {
                        throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
                    }
                }
            });
            // console.log(proxy.a);
            console.log(proxy.name);
        }

        testGet2(){
            const proto = new Proxy({}, {
                get(target: any, propertyKey: string,) {
                    console.log('GET ' + propertyKey);
                    return target[propertyKey];
                }
            });

            const obj = Object.create(proto);
            console.log(obj.foo);
        }

        createArray(...elements: Array<any>){
            const handler = {
                get(target: any, propKey: string, receiver: any) {
                    const index = Number(propKey);
                    if (index < 0) {
                        propKey = String(target.length + index);
                    }
                    console.log(propKey, 'propKeypropKeypropKeypropKeypropKeypropKeypropKey', target,  target[propKey])
                    return Reflect.get(target, propKey, receiver);
                }
            };

            const target = [];
            target.push(...elements);
            return new Proxy(target, handler);
        }

        proxyCreateDom(){
            const httpGet = (url: string): Promise<any> => {
                console.log(url,'我是url');
                return new Promise(resolve => {
                    setTimeout(() =>{
                        resolve('{"a":"1","b":"2"}');
                    },1000)
                })
            }
            const createWebService  = (baseUrl: string): any =>{
                return new Proxy({}, {
                    get(target: any, propKey: string) {
                        return () => httpGet(baseUrl + '/' + propKey);
                    }
                });
            }
            const service = createWebService('http://example.com/data');

            service.employeesssssssssss().then((json: any) => {
                const employees = JSON.parse(json);
                console.log(employees,'employeesemployeesemployeesemployeesemployees')
            });
        }

        testClass(): void {
            class A{
                private x: number;
                constructor() {
                    this.x = 1;
                }
            }

            class B extends A {
                constructor() {
                    super();
                    // this.x = 2;
                    // super.x = 3; // esline-disable-line
                  // 3
                  //   console.log(this.x);  // esline-disable-line
                }
            }
            const b = new B();
            console.log(b, '我是BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
        }

        add(): any {
            // const agrs: any = [].slice.call(rest);
            const agrs: any = Array.from(arguments); // eslint-disable-line
            const fn = () => {
                const fn_args: any = [].slice.call(arguments); // eslint-disable-line
                return this.add.apply(null, agrs.concat(fn_args))
            }
            fn.valueOf = () => {
                return agrs.reduce((a: any, b: any ) => a + b);
            }
            return fn;
        }
    }
</script>

<style scoped lang="less">

</style>
