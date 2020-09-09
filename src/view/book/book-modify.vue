<template>
  <div class="container">
    <div class="title">
      <span>修改图书</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui" /> 返回 </span>
    </div>
    <el-divider />
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form ref="form" v-loading="loading" :model="form" status-icon label-width="100px" @submit.native.prevent>
            <el-form-item label="书名" prop="title">
              <el-input v-model="form.title" size="medium" placeholder="请填写书名" />
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author" size="medium" placeholder="请填写作者" />
            </el-form-item>
            <el-form-item label="封面" prop="image">
              <el-input v-model="form.image" size="medium" placeholder="请填写封面地址" />
            </el-form-item>
            <el-form-item label="简介" prop="summary">
              <el-input v-model="form.summary" size="medium" type="textarea" :rows="4" placeholder="请输入简介" />
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import book from '@/model/book'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    editBookID: {
      type: Number
    }
  },
  data() {
    return {
      loading: false,
      form: {
        title: '',
        author: '',
        summary: '',
        image: ''
      }
    }
  },
  async mounted() {
    this.loading = true
    this.form = await book.getBook(this.editBookID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await book.editBook(this.editBookID, this.form)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
