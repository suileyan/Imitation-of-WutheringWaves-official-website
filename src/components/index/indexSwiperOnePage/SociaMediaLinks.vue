<!-- SocialMediaLinks.vue -->
<template>
  <div class="media-slide absolute right-8 top-40 flex flex-col items-center">
    <div class="media-box flex flex-col items-center pt-4 pb-4">
      <div class="link-item w-8 flex mb-4" v-for="(item, index) in mediaData" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 添加props声明
defineProps<{
  active?: boolean
  loading?: boolean
}>()

const mediaData = ref([
  {
    link: 'https://www.kurobbs.com/mc/home/9',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAYAAAC9pNwMAAAD8ElEQVRIib2XW4hXVRTGf3PRGW1qshmLqYSsxDB7qAyCYqJ7ZIxUZFQQgWkJZRcQg3wVSiihMnqqqIzKBx9SiiAiKrramFGQYpRi1ykbJ8a56HyxnO8Mi+P5638oWnA456yz9/r2un17nwYASfwP0g1cDKwNqOb/AO9koNPP/cDPwBjQDpwJLAQWAQs85jTggXqBTwJOBc4FzgDmAHNt5HRgiscNA9uAe4FW4COg0d+GgD5gBbC3KtTnAfNteL7fA6hhElEYBJ4A9gD328Yq6yLUvRl4BvAi0FNh6JBD+A3wI/A9sAP4A/jT+VtfMe9O4CdHbOMRXwNY0mqNy3ZJz0haIalH0vmS2iU1elyt65COlPWS+iRdV56TgbdJ2ngM48U1RdI8SV1JVwW8Nj1vkNRRjG9MjkcVrkvvUY2PuYCyREq2A+8Bx1k/LRVRlgPp+XbgCxfnhMcRxl8kne0VPehVDltfeNUk6Vl/ezTp2ySNVXi8qkK3Q1JLARyh2yfpLEkzJf0q6Q5JJ0gakdRtgEs8+dNS6DsqAEIeqtD1S7qgCE9Ud1OsAWgzKWxwNQcZjHjcJuAgcGMppLX4YKSGvqGY0GDQsdSvU53DWNCAW20mcI9bJEtrDYCBCl3gjGaPi8m5SJr8LRbUYt2FFYVUi1wuBX4o6SKKw1WV2OT7aIpEeH8b8BqwDHi5NKelwk7IrcDbtpEX2ViVmwJY5uEY87t1S4AOt0aEfTHwV+LqsrQZaDhF9HDNVHkcILuAz4HXgU9STgft+TpTZ7v15Rzv8z3sXwG8kb5FqIcycBGOPocoBvSaSLIEPz8MLDU4pVCGPAe84g6Y4zz/loHHZ0mtkkYlza6TMstXd6lXg5sXSdrr9wOSHvfzHknTm9OKm1N+a0mE9ERgOtDlUEeu7yuNnwe8D/ydUnGKd7QoxMEMHM2+BnjVJ4pOG+/ytjbDxNJh4FoS9XB3yn8hVwObzesU+/FUF8TRDNYjW73hz3ZkIq+3ADd47qgPAquLHMcmsasG39YrByVdax4v5IPgZUkDSfdC3hbHXKlb/4W3w/ZoQdIFcy0Hnkq6ryeeXKHTJF0vaamkJyXtnKTHcRBYLKm3pN8t6cr0Pjfw8pnrZuAlYAvwoVe/H7gJuNzFdSz5FrgL+Kw0Lnp5J/AVcM0E09njN0sr3Zx6tVPSVT6XvSNp/1E8Xy7pkZIu5j8taaFraWXh8Sxgt1c36JysSX1Y5KvHLBTef+eoDLkj+n0/3rT7sfsZ02Ycl94CLnI9HAaOU+TzkrZIOqcGOxVHniFJy+pgs8uSx0usm+X62TTZf6eVwLvAl3WOD9II4/F3EXvAuAD/AKDXP7pSsw2IAAAAAElFTkSuQmCC',
  },
  {
    link: 'javascript:;',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAACOklEQVRIia2WX2jOURjHP2ZYNjdCFjWbsoslf1K4krhTcuXGyoVLrcmNkgt3FEWIciPlQkqahEQuVi5QtJXNltl6WyztBqNovjpv58fp7Pzec87Lt877/t7vc57zPc/vfc7znHkAkijBOmAX0AWsBOYDn4EJoB94bNzLnKMwwt7YIalP0qxqY0TSMUlNgTVqDpgrfCoiFsKw3WzdwjfqEHWxrx7hk4GFbkrqLxG5J+l+gO/KEV4bWKDXmTjk2S46tgee7UWKcINNvN5AAq6y34uAJs+23Hle6tm2ADtjCV0cpwFgfcD+CljhbMLFKNAKtAB9gFnjLdAMVOxx+xoT/gQsi+0ygEHgqBUzZ30bsARoAxqBN8Bd4DYwNcdd0se85K3ihKROSdcS5k5JOhRKrueZouckbbIL5uCKL3w6w/mlpA2Svnj8z0T/467wmgzhA5KuetwZSW2SLjvcjKStkjokvfPmtxfHaRzoSUgm0xxmgG6Pn7S2CYebBYaAMdtYXBwuIi7G+Ui01yV1l9iGA9y0pEqAf9bg7eSIjfx7ScTmXP4qsXUGOFNcVgf4Zl/Y4BIQ4g02A4tLbDmYbCwRNmXyEXDBPm8HOmwRqPwH4TvVT+c/brEF4WCkyD+M5EItjEta4AsvTOyn7ZK+1Sm80e1OBX4kvqr3wG5gOuP1fgD2AK//MLn3JWeYonErMdL9rm/slpkK05n22qw3LdQkrUnCJ7aXnwWe2hvrX/xDxKnDdDFTnFqrvyV+A4mB5KTgmUe2AAAAAElFTkSuQmCC',
  },
  {
    link: 'https://weibo.com/u/7730797357',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAC6klEQVRIia2WbWjPURTHv9s8tXkoz17Mi80yKYrSFAtlebEmUpSHt2QhSfJQRvNiXkwIa6nNGymEd8pDtqaMKE2TjFayiER5bLaPLue3bnf3t/8/7dTtd8+533O/99xzz/3dHEkCNEwyUVKdpHJJYyR1S7ov6YKkF4MoHPEwtXLi0gvs9jmGO2IXZa2kSZJ6JM2RVClppI3XSDryPxHnAxXAamBMlj4lQJu3DxUDgWbhPA44DLz0JngATIxgxwL7gUZgjWdvN79X2RJXAl0pudsZwa8JMOe9yPuTqDMR70ohTORYil810AD0GW692W+a3jAUcW0GUieLDDvXyOqBg17+qwzXYfpe0++lER/IgvQ3cBS4Fhn7DMy0uZKoXX+d9dtjxJuyIM1GaoA8w722ufeZ3jIiqMMiSc3DVNNu7j5J2yU9NVuVfbtDYne15UUm+S6pVVKHXYM/JI2XVCJpoaSyiM9l+57zbNclTZB0+q9m27A2sn3vgENAUYaSWwrcCHxPAfMj2FFhHXcGju7QTA+cnD4PmJyygB3BHP12AAdhE+LFgcP1AFgINAPvbfwtcDJZfdDORHZuWxrxcQ/UDeR6oFKPMJQ7QE7kyvwc4D4AE2LEtz3QVg/gFvAsmMSl5Imnb4lE3RJZ5EIfk2unrcA7eW1ef6WkudZvtLEmSfUepkqD5VdKZQxIUk49nq3X6y+3b7Wks9ZvtRJK5GuEpDTQOyV1+YYk4muebZbXTxZ01bNNlpTv6VcCks2SCgNbfRDQP7HT+cZycdvLhfvf/rScrQIuBnm7G+R2BvAxwLQMVU4K3ks1wf84JrfsgZDgioHnAc79x6dkInZto+fkXhBTzV4A7AEuWf2u8HxGA9uBTwGpe3FMS7vtQmLXlgCPvAmagDJLR1Lf7rsMqIvceE5OZHqTxYiTtgF4nLLNMXG5da+OBRnu9b8tm+ftbKtnV0LFdqJ/S/om6YOkV5IeSnKvii9DTTQgkv4A1q4wkEKwx2IAAAAASUVORK5CYII=',
  },
  {
    link: 'https://space.bilibili.com/1955897084',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAMAAACKeiw+AAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMA4XrrwQ3y5VNELhr9+dbKt6CVc2BcMykmCM+8qaWbjoV/b0xJPiTc2NSvkYhmORT2sp03H2trtd8jAAABZklEQVQoz3WS2XLqMBBE2xsYDAYbs+9bEvbk5ub8/6cFZFuQougn9RzVjEYzuql/6Oml+il8v8ZNYPAaO0940DnUrJkAb39wCDNrlk/4P6TWdJ9rV5na8xbo/8Ut2vYcNeCx715Pe/zHVGytWSXjio6MtHbdpEjFxuJO9V9FJ961dMaYyB5Ci+vxFW/wFPpTx0TmkFk89PYV9WmoFvvk+WAlq01gGg+i7totG1/qrqgXBA3O1tcgvdMFdFWlrtZulk8UJnfswkIjvgWeCQSfjPWYK1GbUB5xOdJKKx59LWqmNLQ146QPPnI8opAzj26Xd3Jx1SrxGKhg1Mz0haeMw7XAe46ngP+2cACon25/wlRJiefkrwybwLIOGuDriGN7MQvTveFzAJeAWKsSZwAXJQC+hlAXKKSa4zVANgPMlnyy0jG9Rps5PlOo2jEjmm/Nknm7YsaGNfyfoR41LOxlMkndTaRn/QK4yDZDq5D7uAAAAABJRU5ErkJggg==',
  },
  {
    link: 'https://www.douyin.com/user/MS4wLjABAAAARuTyGXitt4QGTdl87TYlMXkxVva40jhbk9S1p4zrBrEQ9BD9nCbF61XItUl564wC',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMALcPSMfulmR3z5Nl07YiBbhK/uraEemFURz85JBUOB83Jr2ssFnljmlEAAADKSURBVCjPndLZFoIgEAZgUkgU9yWXTFvn/R8x4EhnIuSi/4qZDzgcgFjhkcyJ7OUAMomfYfZz7ueYehkS6mWIi5ebTViYutnk+B9fO2ZxlTZJFmwcEN6FmB+xaoeG9QL6NBoBWIxTgI8p83KrLTqsi4u5Vn1FLu63fXe4wC9MfzhXHfO9JlXUmEvVabciRbeJ9mNnPV4SVZQER6hWNsrRfNNT+Rf3oCPuAXM+ZA04Gbf4IpDG8hS2Nx8Vzj86BBrDciXuVNMwcrv5BhRtKHJ+Iws3AAAAAElFTkSuQmCC',
  },
  {
    link: 'https://www.taptap.cn/app/234280?utm_medium=rep&utm_source=rep_ssywxpjcny3',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAMAAAB7LJ7rAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMAmGiSjFj7igbp8r4gFPjKtK5PKArt5NPGb2JEMfXduZx+dVtUQDosD9ClhRxqKlRiAAAA3UlEQVQoz53PV5bCMAwFUEEGtzgJ6aTQ65S3/+2NBQEf2g/vR/a5tmRT0E6GZIqeI3BNGb3gr0prAcRa1yfeK0X7NGyIfK8AGLkSTX7XI0CqGbCVwjTF0AEIiNoSLnxyAxgeGp489wJJlqfMY6BcbxYQW88/gCWSA6/crDmWN3YDZ+SZ3xJC37iokT7wEsbfTqDVHRcatZ+9ApromAycHPsQkJ6tgDAxf4cZsVua/MySmbIFMN0bzA+Oqwr47uicv66zXHN32o57vj0tsgO9CTPXz7gFUnqfaLezl9U/fO0dpSNxOrsAAAAASUVORK5CYII=',
  },
  {
    link: 'https://www.3839.com/a/143964.htm',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAwIDc5LjE3MWMyN2ZhYiwgMjAyMi8wOC8xNi0yMjozNTo0MSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI0LjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE5MEZBOUM5RDNEMTExRUY4QjFFRTUyRDkzMDBDNzEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE5MEZBOUNBRDNEMTExRUY4QjFFRTUyRDkzMDBDNzEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTkwRkE5QzdEM0QxMTFFRjhCMUVFNTJEOTMwMEM3MTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTkwRkE5QzhEM0QxMTFFRjhCMUVFNTJEOTMwMEM3MTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7+IrHmAAAEzElEQVR42tyaf2hWVRjH39emTlGZa+ZabbnR0CgtdaVmoo4aau4fkUmTAlMRsn/amFqxof4h/QD7I1GZ5aRZEE2F0oS1OWSoQ6c12lZqZqLJxB+bOls67fo99L1wvNxz7zn3ffd62QMftnvPz+ee55znOee8UcuyIv1BBkT6ifRbRaaAU+AyKIlD/flgEzgMToNmsAMsjLsmYo5IdFgPygqwF3wNhjvyejEK/GB5SwuYalCnJ84XXlKsWWkGuGjpS348FHGa1seKgROm0ag5yAfA4wZGUQ8yYrWsqMvyO49zpYLPwqaXSOlPgUIwGYwCV8EJUA3mgp0B+rEVlIEF4GXwBOgG7WAf6zeaIzJPg5ekZ6H05+A/hYl0gi4rmPwLLnmk76LJKvsb1XSIyeAIeOEhrrBdYDpHScu0VHacHwJ3Icw4C/wTxCEWhkQJIY+C8qAjsh/MCZETv8xV7q7JiIj08SGLRsRKmWtqWlFO9LDJcFNF7oFfQqaEWL1+DTLZ20KmyDXQY6rIRrA8ZIrkgONgoK4in4L3wJAQzpFJYLfO8ivinUOKSk6CWtAA/gS9IB1MZZw2PYEKvUpnrYy1trvEO81gtkZInQaqrMTIHlUYb4vTnDaAPI7CYjrJK+I7EOGcWsFacJPR8mtuoYSGtNKsXwfPML57A1RxxZJlrF/0u1HSeiXfzQEXNL6SiI7XsEw26Nb8umfAfEc/oi59+1AqU6/aIdrkM2Mln4sCDPuXLJunkfdHqe0Cbq+vSOkXaa45zDMe3AWf+CkS4d5D/M1yafgweBFU+HSwhHVs9sjTJLX5rYbSHzHvOPCkjiI2R10qW6S5zxeSDAYqNmT3wEjW85NjEm/zMMvP/A4fnEx0VPAVTz5GSDb8LHgX9CgaXcW89S5pW5i2XHpXJLWfCf5S1DvNRJFyR+Fcj7xnFQ0eZPr7LmnjHMdQB1zqXaExr3xDlEzHcw1YzQMIOzJYygOKLI+wO+KydAr5HaSB0XxOdcmTq6h32gORuc+IbFF8jVKmD9GYI63MO5P//81lvI7vZzjyb+Jh4ADwFueRpZhf6XZfk3xG5JTifQmDtlc0HNwF/j0InnNJv+F4XkkH2O0xyna5Lt2tbg5j/6ExxEOiY5vBOjALXGI0kMIP0s7QPMWw3m8YZWiZluB4DLFQL5feiMJEdjKtNEDd75isWlkey6qOFPt0VPiWVOY5YVh3rYki62NQYoPkC7zkmNRenWEbGbqKnA+gwHXwNssLr31Oo8wuqU0xio2MpWy5wfhrCR3sPnr9D3QUWeZorIMNiCW5msuoLTfBIVAmlc9z5PGT31yuGNKlEMZJiuRQPVctsVfP5pnvH9wN3nbJ9whPW2wZBtZzmxxEjoHvQB3bHcFrimbTawU/GcyOCq/8MzdPj3GrK7aeBTwPi6e08aBQ2dmkAJXeZmdXJXBvXuOlRCy3upUJPjVpCHJjpSO5HuFLvKWbp/B3+mJETpNEjcYd03t2E9mdIEW+D3oZanJ0eSYBiqTxpqrPRkT4lWXgVh9e6Lypo0SsI2KLuD0q5oHalDicFTdxuf0CXNctFA9FZBGOcQJ4nivbGG51R3JPM4jOspeOtBN00Lm2RP7/YUKg1TDeijw06Tc/c7ovwAA+hskylD3A0wAAAABJRU5ErkJggg==',
  },
  {
    link: 'javascript:;',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAdCAMAAACKeiw+AAAAeFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GqOSsAAAAJ3RSTlMA1M/FyYML5tynb7m0cz8xB/bx6+HLwb2ZkopdNSQU9Kt5aWFgJx1bu1GYAAAAvElEQVQoz33SWRKCMBAE0GyAYZFFBJXF3bn/Df1JAdOJ9u+rzFS6RqypHnnSNEmWViKQtyEXNfo6XWlN6fGRNtmhDsSSAkvOLdeRIHvGKXLE+IScM+6RFXwLIhnrv6/jBPkwb/gFCMUYJri8BIJiohCfF96FOIHZv6YXYb44tkQ1Wr3WrmgwyPK5nAz1QnssLDm+z/76SMTFpvQWKo8Fy0eyS50ET8Xu5QaPI69Szp1W0ujM2kwbqXTnOvkCPaBIJk5m0CgAAAAASUVORK5CYII=',
  },
])
</script>
