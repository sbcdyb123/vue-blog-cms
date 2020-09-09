<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="form_wrap"
      label-position="top"
    >
      <div class="form_item">
        <el-form-item label="首图" prop="banner">
          <upload-imgs
            ref="uploadEle"
            :rules="uploadConfig"
            :multiple="true"
            :value="initData"
            :min-num="1"
            :max-num="1"
            :sortable="true"
          />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="概要" prop="summary">
          <el-input
            v-model="ruleForm.summary"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10}"
            placeholder="请输入概要"
          />
        </el-form-item>
      </div>
      <div>
        <el-form-item label="标签" prop="label">
          <MoreTag v-model="ruleForm.label" />
        </el-form-item>
      </div>
      <el-form-item label="文章内容" prop="content">
        <markdown-editor v-model="ruleForm.content" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="isEdit" type="primary" @click="submitForm('ruleForm','edit')">确认修改</el-button>
        <el-button v-if="!isEdit" type="primary" @click="submitForm('ruleForm','publish')">保存并发布</el-button>
        <el-button v-if="!isEdit" type="primary" @click="submitForm('ruleForm','draft')">保存至草稿</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/component/MarkdownEditor'
import MoreTag from '@/component/MoreTag'
import UploadImgs from '@/component/base/upload-image'

import article from '@/model/article'
export default {
  components: {
    MarkdownEditor,
    UploadImgs,
    MoreTag
  },
  data() {
    return {
      ruleForm: {
        banner: '',
        title: '',
        summary: '',
        content: '',
        label: ''
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'change' }],
        summary: [{ required: true, message: '请输入概要', trigger: 'change' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'change' }]
      },
      uploadConfig: {
        minWidth: 100,
        minHeight: 100,
        maxSize: 5
      },
      isEdit: false,
      initData: [
        {
          id: '12d3',
          display:
            '',
          src: '',
          imgId: 'sd9873429'
        }
      ]
    }
  },
  mounted() {
    this.initEditForm()
  },
  methods: {
    async initEditForm() {
      if (this.$route.meta.title === '修改文章') {
        this.isEdit = true
        const form = await this.getArticleById(this.$route.query.id)
        this.ruleForm = {
          ...form
        }
        this.initData = [
          {
            id: 'hahah',
            display:
            'http://localhost:5000/assets/2020/09/08/0051c3cb-3d4b-4c96-a004-fe256b6bf53e.png',
            src: '/images/index/Lin_UI_%E5%B0%81%E9%9D%A2.png',
            imgId: '2477899809'
          }
        ]
      }
    },
    async getArticleById(id) {
      return await article.getArticleById(id)
    },
    async getUploadValue() {
      this.ruleForm.banner = await this.$refs.uploadEle.getValue()
    },
    async editArticleById(body) {
      const res = await article.editArticleById(this.$route.query.id, body)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message({
          type: 'success',
          message: `${res.message}`
        })
      }
      this.$router.push({ path: '/article/list' })
    },
    async createArticle(body) {
      const res = await article.createArticle(body)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message({
          type: 'success',
          message: `${res.message}`
        })
      }
    },
    async submitForm(formName, type) {
      if (!this.ruleForm.label) {
        this.$message.error('请添加标签')
      }
      await this.getUploadValue()
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { title, summary, content, banner, label } = this.ruleForm
          const body = {
            title,
            summary,
            content,
            banner: banner[0].display,
            author: '方龙',
            status: 0,
            label
          }
          if (type === 'edit') {
            this.editArticleById(body)
          } else if (type === 'publish') {
            this.createArticle(body)
          } else {
            body.status = 1
            this.createArticle(body)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.ruleForm.label = ''
      this.$refs.uploadEle.clear()
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.form_wrap {
  margin: 20px;
  padding: 20px 200px 20px 50px;
  background: white;
}
.form_item {
  width: 50%;
}
</style>
