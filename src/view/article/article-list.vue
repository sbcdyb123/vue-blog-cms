<template>
  <div class="app-container">
    <el-row type="flex" :gutter="40" class="search_wrap">
      <el-col :span="12">
        <el-input v-model="searchText" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="search" />
        </el-input>
      </el-col>
      <el-col>
        <el-date-picker
          v-model="selectDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="medium"
          popper-class="date-box"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        />
      </el-col>
    </el-row>
    <el-row type="flex" :gutter="40" class="button_wrap">
      <el-col :span="4"><el-button type="primary" icon="el-icon-plus" @click="toAdd">添加文章</el-button></el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      :fit="true"
      highlight-current-row
    >
      <el-table-column type="selection" width="35" />
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="作者" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="图片" align="center" width="200px">
        <template slot-scope="scope">
          <el-image style="width: 150px; height: 100px;border-radius: 10px;" :src="scope.row.banner" fit="cover" lazy />
        </template>
      </el-table-column>

      <el-table-column label="标签" align="center" width="200px">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.label"
            :key="item"
            class="label_tag"
            :type="item === 'javascript' ? 'warning':(item==='vue'?'success':'')"
            effect="dark"
          >{{ item }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="发布时间" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time | formatDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="点赞量" align="center" width="100px">
        <template slot-scope="scope">{{ scope.row.like_count }}</template>
      </el-table-column>

      <el-table-column label="阅读量" align="center" width="100px">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态" align="center" width="100px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status | checkArticleStatus }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" align="center" width="250">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="edit(row.id)">
            修改
          </el-button>
          <el-button size="mini" type="success">
            发布
          </el-button>
          <!-- <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button> -->
          <el-button size="mini" type="danger" @click="deleteArticle(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import article from '@/model/article'
import { articleLabelSplit2List } from '@/utils/ramda/article'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      searchText: null,
      selectDate: null
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    search() {
      this.getArticleList()
    },
    toAdd() {
      this.$router.push({ path: '/article/create' })
      console.log(this.$router)
    },
    edit(id) {
      this.$router.push({ path: '/article/edit', query: {
        id: id
      }})
    },
    async getArticleList() {
      try {
        const params = {
          title: this.searchText,
          start: this.selectDate?.[0],
          end: this.selectDate?.[1]
        }
        this.listLoading = true
        const res = await article.getArticleList(params)
        this.listLoading = false
        this.list = articleLabelSplit2List(res.items)
      } catch (error) {
        this.listLoading = false
        console.log(error)
      }
    },
    async deleteArticle(id) {
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.listLoading = true
        const res = await article.deleteArticle(id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getArticleList()
          this.$message({
            type: 'success',
            message: `${res.message}`
          })
        }
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.label_tag + .label_tag {
  margin-left: 10px;
}
.search_wrap{
  margin-bottom: 20px;

}
.button_wrap{
  margin-bottom: 20px;

}
.app-container{
  padding: 20px;
}
</style>
