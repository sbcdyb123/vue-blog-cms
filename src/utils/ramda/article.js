import * as R from 'ramda'

const handle = (item) => {
  return {
    ...item,
    label: R.split(',', item.label)
  }
}
const articleLabelSplit2List = R.map(handle)

export {
  articleLabelSplit2List
}
