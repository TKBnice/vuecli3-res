<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table v-loading="listLoading" ref="dragTable" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <i v-for="n in +scope.row.importance" :key="n"  class="el-icon-star-on icon-star"/>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="{}">
          <i class="el-icon-rank drag-handler"></i>
        </template>
      </el-table-column>

    </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}</div>
    <div class="show-d">{{ $t('table.dragTips2') }} : {{ newList }}</div>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import Sortable from 'sortablejs'

export default {
  name: 'DragTable',
  filters: {
    parseTime,
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      oldList: [],
      newList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.items
        this.total = response.total
        this.listLoading = false
        this.oldList = this.list.map(v => v.id)
        this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      })
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      // console.log('dragTable',el)
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // 拖动时候的类名,
        setData: function(dataTransfer) {
          // console.log('----',dataTransfer)
          // dataTransfer.setData('Text', '')//防止Firefox拖动时打开新的窗口
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {//换位
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]//删除移动的这列
          
          this.list.splice(evt.newIndex, 0, targetRow)//删除的这列添加进入新的位置
          // console.log(targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]//删除将移入的这列
          this.newList.splice(evt.newIndex, 0, tempIndex)//删除将移入的这列添加进入新的位置
        }
      })
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  font-size:16px;
  font-weight:bold;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
</style>
