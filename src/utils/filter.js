import moment from 'moment'
export const checkArticleStatus = (status) => {
  switch (status) {
    case 0:
      return '已发布'
    case 1:
      return '未发布'
  }
}

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format)
}
