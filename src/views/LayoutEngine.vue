<template>
  <div class="canvasBox">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { textList } from '../constants'

onMounted(() => {
  const canvas = document.getElementById('canvas')
  const canvasWidth = 600
  const canvasHeight = 800
  const ratio = Math.max(window.devicePixelRatio, 2)
  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  const ctx = canvas.getContext('2d')
  ctx.scale(ratio, ratio)

  // 拼接字体属性
  const getFont = ({
    fontSize = 16,
    fontFamily = '楷体, 楷体_GB2312, SimKai, STKaiti',
    fontWeight = '',
    fontStyle = ''
  } = {}) => {
    return `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
  }

  const padding = 20 // 内边距
  const pageWidth = canvasWidth - padding * 2 // 画布减去内边距可用的宽度作为页面宽度

  // 计算行数据
  const computeRowData = data => {
    const rows = [] // 行数组
    let curRow = [] // 当前行
    let curRowTotalWidth = 0 // 当前行当前的总宽度
    data.forEach(item => {
      // 遇到换行符，那么直接新开一行
      if (item.value === '\n') {
        rows.push(curRow)
        curRow = []
        curRowTotalWidth = 0
        return
      }
      // 测量文本宽高
      ctx.save()
      ctx.font = getFont(item.format || {})
      const textMetrics = ctx.measureText(item.value)
      ctx.restore()
      const width =
        textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight
      const height =
        textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent
      // 将源信息和宽高信息一起保存起来
      const itemData = {
        ...item,
        width,
        height
      }
      // 如果加上当前字符的宽度依旧小于页面宽度，那么可以继续追加到当前行中
      if (curRowTotalWidth + width <= pageWidth) {
        curRow.push(itemData)
        // 更新当前行的总宽度
        curRowTotalWidth += width
      } else {
        // 否则需要创建新行
        rows.push(curRow)
        curRow = [itemData]
        curRowTotalWidth = width
      }
    })
    return rows
  }

  // 获取行数据的总宽度
  const getRowTotalWidth = row => {
    return row.reduce((sum, cur) => {
      return (sum += cur.width)
    }, 0)
  }

  // 获取行数据中最大的文本高度
  const getRowMaxTextHeight = row => {
    let res = 0
    row.forEach(item => {
      if (item.height > res) {
        res = item.height
      }
    })
    return res
  }

  // 获取行数据中最大的行高
  const getRowMaxLineHeight = row => {
    let res = 0
    row.forEach(item => {
      if (item.format && item.format.lineHeight > res) {
        res = item.format.lineHeight
      }
    })
    return res === 0 ? 1.5 : res
  }

  // 获取行数据中最后一个对齐属性
  const getRowTextAlign = row => {
    let res = 'left'
    row.forEach(item => {
      if (item.format && item.format.textAlign) {
        res = item.format.textAlign
      }
    })
    return res
  }

  // 绘制文本
  const drawText = ({ text, x, y, rowHeight, totalRowHeight }) => {
    ctx.save()
    if (text.format) {
      // 字体样式
      ctx.font = getFont(text.format)
      // 颜色
      if (text.format.color) ctx.fillStyle = text.format.color
      // 渲染背景
      if (text.format.backgroundColor) {
        ctx.save()
        ctx.fillStyle = text.format.backgroundColor
        ctx.fillRect(x, totalRowHeight, text.width, rowHeight)
        ctx.restore()
      }
      // 渲染下划线
      if (text.format.textDecoration === 'underline') {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, totalRowHeight + rowHeight)
        ctx.lineTo(x + text.width, totalRowHeight + rowHeight)
        ctx.stroke()
        ctx.restore()
      }
      // 渲染删除线
      if (text.format.textDecoration === 'line-through') {
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(x, totalRowHeight + rowHeight / 2)
        ctx.lineTo(x + text.width, totalRowHeight + rowHeight / 2)
        ctx.stroke()
        ctx.restore()
      }
    }
    ctx.fillText(text.value, x, y)
    ctx.restore()
  }

  // 绘制行
  const drawRow = rows => {
    let totalRowHeight = padding
    ctx.save()
    ctx.textBaseline = 'bottom'
    rows.forEach((row, index) => {
      const maxRowTextHeight = getRowMaxTextHeight(row)
      const maxRowLineHeight = getRowMaxLineHeight(row)
      const rowHeight = maxRowTextHeight * maxRowLineHeight
      const y =
        totalRowHeight + maxRowTextHeight + (rowHeight - maxRowTextHeight) / 2
      const textAlign = getRowTextAlign(row)
      let curRowTotalWidth = padding
      // ctx.save()
      // ctx.fillStyle =
      //   index % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)'
      // ctx.fillRect(0, totalRowHeight, canvasWidth, rowHeight)
      // ctx.restore()
      // 居中对齐
      if (textAlign === 'center') {
        const rowTotalWidth = getRowTotalWidth(row)
        curRowTotalWidth = padding + (pageWidth - rowTotalWidth) / 2
      } else if (textAlign === 'right') {
        // 右对齐
        const rowTotalWidth = getRowTotalWidth(row)
        curRowTotalWidth = padding + (pageWidth - rowTotalWidth)
      }
      row.forEach(text => {
        const x = curRowTotalWidth
        drawText({ text, x, y, rowHeight, totalRowHeight })
        curRowTotalWidth += text.width
      })
      totalRowHeight += rowHeight
    })
    ctx.restore()
  }

  const rows = computeRowData(textList)
  drawRow(rows)
})
</script>

<style lang="less" scoped>
.canvasBox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  canvas {
    border: 1px solid;
  }
}
</style>
