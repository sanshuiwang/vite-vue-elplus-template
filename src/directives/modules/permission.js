import store from '@/store'
// 自定义权限指令，有权限显示按钮，无权限则删除当前按钮节点

export function btnPermissionControl(menuId) {
  let perArr = store.getters.roles || []
  return perArr.includes(menuId)
}

export default {
  mounted(el, binding) {
    if (!btnPermissionControl(binding.value)) {
      el.parentNode.removeChild(el)
    }
  },
}
