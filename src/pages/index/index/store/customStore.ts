/*
  @Author: lize
  @Date: 2020/7/27
  @Description :
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2020/7/27
 */
import {
    MutationTree,
} from 'vuex';
const customState: any = {
    a: 1,
    b: 2,
}
const customGetters = {
    addTest(state: any){
        return state.a + state.b;
    }
}
const customMutations: MutationTree<any> = {
    testMutaions(state: any, n: number){
        state.a += n;
    }
}
const customActions = {
    testAction(context: any, type: string){
        setTimeout(() =>{
            context.commit(type,10);
        },1000);
    }
}

export default {
    namespaced: true,
    state: customState,
    getters: customGetters,
    mutations: customMutations,
    actions: customActions
}
