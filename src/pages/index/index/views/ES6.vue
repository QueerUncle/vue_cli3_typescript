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
            const dom = new Proxy({}, {
                get(target: any, property: string) {
                    return function(attrs: any = {}, ...children: Array<any>) {
                        const el = document.createElement(property);
                        for (let prop of Object.keys(attrs)) {
                            el.setAttribute(prop, attrs[prop]);
                        }
                        for (let child of children) {
                            if (typeof child === 'string') {
                                child = document.createTextNode(child);
                            }
                            el.appendChild(child);
                        }
                        return el;
                    }
                }
            });

        }
    }
</script>

<style scoped lang="less">

</style>
