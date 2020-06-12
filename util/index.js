export const ISSHOW_KEY='isShow'
export const USERINFOR='userInfor'

export const setIsShow = isShow => {
  uni.setStorage({
      key: ISSHOW_KEY,
      data: isShow
  })
}
export const getIsShow = (vm) => {
	uni.getStorage({
	    key: ISSHOW_KEY,
	    success: function (res) {
			vm.isShow=res.data
	    }
	})
}
export const removeIsShow = () => {
  uni.removeStorage({
      key: ISSHOW_KEY
  })
}

export const setUserInfor = userInfor => {
  uni.setStorage({
      key: USERINFOR,
      data: userInfor
  })
}

export const getUserInfor = (vm) => {
	uni.getStorage({
	    key: USERINFOR,
	    success: function (res) {
	        //console.log("----USERINFOR---->",res.data)
			vm.userInfor=res.data
	    }
	})
}
export const removeUserInfor = () => {
  uni.removeStorage({
      key: USERINFOR
  })
}
