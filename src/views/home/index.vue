<template>
  <main class="appHome">
    <h3>当前用户：{{ userName }}</h3>
    <el-row>
      <el-col :span="4">
        <el-input v-model="title" placeholder="请输入名称，点击添加" />
      </el-col>
      &nbsp;&nbsp;
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table ref="tableRef" row-key="id" :data="todos" style="width: 100%" border max-height="600">
      <el-table-column prop="id" label="序列" width="120" align="center" />
      <el-table-column prop="title" label="名称" />

      <el-table-column
        prop="completed"
        label="Tag"
        :filters="[
          { text: 'Done', value: true },
          { text: 'Do', value: false },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="scope.row.completed ? 'success' : 'warning'" disable-transitions>
            {{ scope.row.completed ? 'Done' : 'Do' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作[v-permission命令控制删除权限]" width="300">
        <template #default="scope">
          <el-button v-permission="'canDel'" link type="primary" size="small" @click="handleDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from 'vue'
import watermark from '@/utils/watermark.js'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'AppHome',
  components: {},
  setup() {
    const store = useStore()
    const userName = computed(() => store.getters.userName)
    const tableRef = ref()
    const title = ref('')

    const filterTag = (value, row) => {
      return row.completed === value
    }
    const handleDelete = (id) => {
      store
        .dispatch('home/deleteTodo', { id })
        .then(() => {
          ElMessage.success(`删除成功`)
          getTodos()
        })
        .catch(() => {
          ElMessage.error(`删除失败！！！`)
        })
    }
    const handleAdd = () => {
      if (!title.value) {
        ElMessage.error(`请输入名称`)
        return
      }

      store
        .dispatch('home/addTodo', { title: title.value })
        .then(() => {
          ElMessage.success(`添加成功`)
          getTodos()
        })
        .catch(() => {
          ElMessage.error(`添加失败！！！`)
        })
    }

    const getTodos = () => {
      store
        .dispatch('home/getTodos')
        .then(() => {
          ElMessage.success(`获取列表成功`)
        })
        .catch(() => {
          ElMessage.error(`获取列表失败！！！`)
        })
    }

    onMounted(() => {
      getTodos()
      // 系统添加水印
      const date = dayjs().format('YYYY-MM-DD')
      watermark.load({
        watermark_txt: `${userName.value}</br>${date}`,
        watermark_alpha: 0.1,
        watermark_color: '#606266',
      })
    })

    return {
      userName,
      todos: computed(() => {
        return store.state.home.todos
      }),
      tableRef,
      filterTag,
      handleDelete,
      title,
      handleAdd,
    }
  },
})
</script>

<style scoped lang="less"></style>
