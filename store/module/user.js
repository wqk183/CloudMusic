import {setIsShow,getIsShow,setId,getId,getUserInfor,setUserInfor,removeUserInfor,removeIsShow} from "../../util/index.js";
export default {
  state: {
      //id:''
	  //isShow:getIsShow(),
	  //userInfor:getUserInfor()
  },
  mutations: {
      setId(state,id){
        state.id=id
		setId(id)
      },
	 //  setIsShow(state,isShow){
	 //    state.isShow=isShow
		// setIsShow(isShow)
	 //  },
	  // setUserInfor(state,userInfor){
	  //   state.userInfor=userInfor
	  // 		setUserInfor(userInfor)
	  // }
  },
  actions: {
	  // 登录
	  handleLogin({ commit }, { name, psd },state) {
	  	return new Promise((resolve, reject) => {
	  		uni.request({
	  			url:'http://101.37.202.137:30000/login',
				//url:'http://localhost:30000/login',
	  			data:{
	  				name:name,
	  				psd:psd
	  			},
				method:'POST'
	  		}).then(res=>{
				//console.log("------登录---->",res)
	  			//commit('setId',res[1].data[0]._id)
				//getId(state)
				//commit('setIsShow',true)
				//setIsShow(true)
	  			resolve(res)
	  		}).catch(err=>{
	  			reject(err)
	  		})
	  	})
	  }
  }
}
