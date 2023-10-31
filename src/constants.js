const text = `茫茫人海中，我，与你相遇。\n我为青莲，你为梵音，一眸擦肩，惊艳了五百年的时光。\n你，正值盛年，带着满身的荣耀，缓缓而归。而我，经了长长的漂泊，翻山越岭，终于，来到了你的身边。\n始终相信，遇见是上天最美的恩赐。也许，今生，我就是为寻你而来。\n寒来暑往，春秋交替，指针从未停过脚步，多少人事早已面目全非。然，十五个春秋，你依然在我心中。年少时，你是我心中的梦；长大后，你是我坚持的动力；而现在，你将伴我赢得人生。\n每天来往的路上，我都会看见属于你的身影。那时的我在想，何时，我才能骄傲的站在你面前，与你携手，并肩作战。于是，我站在了梦想的道路上。早已习惯伴着朦胧的月色起床，也早已习惯回家的路上与星月作伴；早已将厚厚的试卷当做人生的挚友，也早已将一次次模拟云淡风轻；早已习惯从讲台上那个人嘴里说出你的名字，也早已习惯你出现在我每晚的梦中。\n终于，我拿到了那张薄薄的纸，但，如千斤重。因为，那上面，有我的苦我的泪，亦有我的幸福我的希望。我知道，我终能来到你的身旁。\n你，经历了七十年的风雨，从懵懂无知的少年，到志在天下的青年，到如今成熟稳重的中年。我知道，你也流过泪水，你也经过挫折，你也想过放弃，但，你没有。\n你，是多少人心中的梦，从1945到2015，你用不断的成长铸就了我们心中的天堂，如今的你饱经风霜，看淡世事，以遗世独立之姿傲立山巅。\n七十年前，你诞生于二战后，仿佛要连接两个时代，七十年后，我坚信，你将继续书写辉煌。\n于万千的人群中，于无际涯的时光里，没有早一步，也没有晚一步，我恰奔赴至你的人生之巅，这何尝不是一种深深的缘。\n你邯郸一中，拥有优秀博学的教师队伍，拥有勤奋刻苦的莘莘学子，拥有最优秀的教学设施，拥有最广阔的校园环境。在你的身边，我将度过三年青葱时光，我将看你书写三年辉煌。\n你，为我注入金色的理想，赋予我腾飞的力量。相信我，我定会努力飞翔，为你下一个百年，贡献出自己的力量。`

export const textList = text.split('').map((item, index) => {
  switch (index) {
    case 6:
      return {
        value: item,
        format: {
          color: '#67C23A',
          textAlign: 'center'
        }
      }
    case 8:
    case 9:
    case 10:
    case 11:
      return {
        value: item,
        format: {
          color: '#F56C6C'
        }
      }
    case 14:
    case 15:
    case 16:
    case 17:
      return {
        value: item,
        format: {
          fontSize: 20,
          fontFamily: '黑体',
          fontWeight: 'bold',
          fontStyle: 'italic',
          textAlign: 'right'
        }
      }
    case 19:
    case 20:
    case 21:
    case 22:
      return {
        value: item,
        format: {
          backgroundColor: '#409EFF'
        }
      }
    case 42:
    case 43:
    case 44:
    case 45:
      return {
        value: item,
        format: {
          textDecoration: 'line-through'
        }
      }
    case 47:
    case 48:
    case 49:
    case 50:
      return {
        value: item,
        format: {
          textDecoration: 'underline'
        }
      }
    case 100:
      return {
        value: item,
        format: {
          lineHeight: 3
        }
      }
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
      return {
        value: item,
        format: {}
      }
    case 88:
    case 89:
    case 90:
    case 91:
      return {
        value: item,
        format: {}
      }
    case 199:
    case 200:
    case 201:
    case 202:
      return {
        value: item,
        format: {}
      }
    case 250:
    case 251:
    case 252:
    case 253:
    case 254:
    case 255:
      return {
        value: item,
        format: {}
      }
    case 304:
    case 305:
    case 306:
      return {
        value: item,
        format: {}
      }
    case 505:
    case 506:
    case 507:
      return {
        value: item,
        format: {}
      }
    default:
      return {
        value: item,
        format: {}
      }
  }
})
