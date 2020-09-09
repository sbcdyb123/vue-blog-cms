<template>
  <div id="rose" />
</template>

<script>
import { Rose } from '@antv/g2plot'

export default {
  name: 'Rose',
  data() {
    return {
      data: [
        {
          type: '服装',
          value: 2700
        },
        {
          type: '游戏',
          value: 500
        },
        {
          type: '数码',
          value: 898
        },
        {
          type: '食品',
          value: 376
        },
        {
          type: '书籍',
          value: 760
        },
        {
          type: '其他',
          value: 500
        }
      ]
    }
  },
  mounted() {
    new Rose('rse', {
      title: {
        text: '品类分析',
        visible: true
      },
      data: this.data,
      radiusField: 'value',
      categoryField: 'type',
      colorField: 'type'
    }).render()
  }
}
</script>

<style scoped></style>
