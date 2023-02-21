<template>
  <el-upload
    :file-list="modelValue"
    :action="action"
    :headers="headers"
    :method="method"
    :multiple="multiple"
    :data="data"
    :name="name"
    :with-credentials="withCredentials"
    :show-file-list="showFileList"
    :drag="drag"
    :accept="accept"
    :list-type="listType"
    :auto-upload="autoUpload"
    :disabled="disabled"
    :limit="1"
    class="upload-plus"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :on-exceed="onExceed"
    :on-error="onError"
  >
    <slot></slot>
    <template #tip>
      <div class="el-upload__tip">
        {{ modelValue.length > 0 ? '' : tip }}
      </div>
    </template>
  </el-upload>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
import { reap } from 'safe-reaper'
import download from 'downloadjs'

export default defineComponent({
  props: {
    // 属性详情见：https://element-plus.gitee.io/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7
    action: {
      type: String,
      default: '',
      required: true,
    },
    headers: {
      type: Object,
      default() {
        return {}
      },
    },
    method: {
      type: String,
      default: 'post',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    name: {
      type: String,
      default: 'file',
    },
    withCredentials: {
      type: Boolean,
      default: false,
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    drag: {
      type: Boolean,
      default: false,
    },
    accept: {
      //文件类型 https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#limiting_accepted_file_types
      type: String,
      default: '',
    },
    listType: {
      type: String,
      default: 'text',
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 1,
    },
    modelValue: {
      //父组件必须传递v-model,表示已经上传的文件列表值[{name: '', url:''}]
      required: true,
      type: Array,
      default() {
        return []
      },
    },
    tip: {
      type: String,
      default: '',
    },
    limitSize: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue', 'onSuccess', 'onRemove'],
  setup(props, { emit }) {
    const beforeUpload = (file) => {
      const isImg = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      const isLtmitSize = file.size / 1024 / 1024 < props.limitSize
      if (!isImg) {
        ElMessage.error('只能上传.jpg, .jpeg, .png文件')
        return false
      }
      if (!isLtmitSize) {
        ElMessage.error(`上传图片大小不能超过${props.limitSize}MB!`)
        return false
      }
    }

    const onSuccess = (response, uploadFile, uploadFiles) => {
      const code = reap(response, 'code', '')
      if (code === '0') {
        const url = reap(response, 'response', '')
        const name = reap(uploadFile, 'name', '')
        const list = [{ name, url }]
        emit('update:modelValue', list)
        emit('onSuccess', { response, uploadFile, uploadFiles })
      } else {
        ElMessage.error('上传失败！')
      }
    }

    // 点击已上传的文件列表
    const onPreview = (uploadFile) => {
      const url = reap(uploadFile, 'url', '')
      download(url)
    }

    // 删除已上传的文件
    const onRemove = (file, uploadFiles) => {
      console.log(file, uploadFiles)
      emit('update:modelValue', uploadFiles)
      emit('onRemove', { file, uploadFiles })
    }

    // 超过文件数
    const onExceed = (files, uploadFiles) => {
      console.log('onExceed-files: ', files)
      console.log('onExceed-uploadFiles: ', uploadFiles)
      ElMessage.warning(`最多上传 ${props.limit} 个文件`)
    }

    const onError = (error) => {
      ElMessage.error(error)
    }

    return {
      beforeUpload,
      onSuccess,
      onRemove,
      onPreview,
      onExceed,
      onError,
    }
  },
})
</script>
