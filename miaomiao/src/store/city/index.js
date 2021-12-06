const state={
    // 定义状态
    nm:window.localStorage.getItem('nowNm')||'北京',
    id:window.localStorage.getItem('nowId')||1
}
const mutations= {
    // 监听状态的改变
    CITY_INFO(state,payload){
        state.nm=payload.nm
        state.id=payload.id
    }
}
const actions={
    // 
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}