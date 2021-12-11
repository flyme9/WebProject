const state={
    // 定义状态
    name:window.localStorage.getItem('username') || '',
    isAdmin:window.localStorage.getItem('isAdmin') || false,
    userHead:''
}
const mutations= {
    // 监听状态的改变
    USER_NAME(state,payload){
        state.name=payload.name
        state.isAdmin=payload.isAdmin,
        state.userHead=payload.userHead
    }
}
const actions={
    
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}