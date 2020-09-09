<template>
  <div>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <i v-else class="el-icon-circle-plus button-new-tag" @click="showInput" />
    <!-- <el-button  class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      dynamicTags: []
    }
  },
  watch: {
    dynamicTags: {
      immediate: true,
      handler(newVal) {
        this.$emit('input', newVal.join(','))
      }
    },
    value: {
      immediate: true,
      handler(newVal) {
        this.dynamicTags = newVal ? newVal.split(',') : []
      }
    }
  },
  // created() {
  //   console.log(this.value ? this.value.split(',') : [])
  //   this.dynamicTags = this.value ? this.value.split(',') : []
  // },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      const exist = this.dynamicTags.some(label => label === inputValue)
      if (inputValue && !exist) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  cursor: pointer;
  vertical-align: middle;
  color: #3963bc;
  margin-left: 10px;
  font-size: 24px;
  height: 24px;
  line-height: 24px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.input-new-tag /deep/ .el-input__inner {
  height: 24px;
}
</style>
