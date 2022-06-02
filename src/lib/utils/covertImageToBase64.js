//module.exports = covertImageToBase64

export function covertImageToBase64(src, callback, outputFormat) {
  var img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    var canvas = document.createElement('CANVAS')
    var ctx = canvas.getContext('2d')
    var dataURL
    canvas.height = this.naturalHeight
    canvas.width = this.naturalWidth
    ctx.drawImage(this, 0, 0)
    dataURL = canvas.toDataURL(outputFormat)
    if (dataURL === 'data:,') {
      dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAKHklEQVR4Xu1da2wcVxU+Z3ZT2+uSuhUhG9Iip1CpcooUUglCioShqigICRcFJB4lRQqPNgICUgDxAwo/EBCpDaDwjERDC0gQNUZCUFRK/APSEqnGEo5VqRBHlOB1gxon7a699u4c9M3ubHbGszuvO3Mn9l7JciLf5/fde86955x7hymj6SWR66qv1HaQYYwwm7cQ8TCRbCUyNjHJkBANEtGGZvdXmKgsxAtE5gUiPk8k50SM58k0Z/quzU/dwHwpi0PlrHTqssirK4v1u0holAzeTSK3Ke0b8zSZcoqYJgoDuSc3Mv9Paf0RK9NKwL/L5ddew/17iGSMiN4RcQxRi50k4vFlWTr+usHB/0atJG45LQScL9fel2PaS0T3xB2AovIn6kLHtg7mf6uovsDVpErAfLl+v0nmfmbeHriHKWYUkTMGGUc2D+Z+mFazqRAA4IXpIJFsS2tg8drhWRY6lAYRiRIAUZNn/pqQvCkeIHpKM/HfayJfT1I0JUIAlGuf0f9tEfmoHujUtsrMj1XNpS8loayVEzC/WPsYCR8WkuvVwqC3Nia+SCwHNg/kf66yJ0oJKJVrPyamT6rsYObqEvpJcTD/KVX9UkLA3MvVEc4ZPyPiN6vqWLbrkdNSNz++5VV9M3H7GZuAF5dq7xaTf7HWRI4fsBBJbMhHXtOf/4Nf3m5/j0UA5L0IHYvTgau9LDPtjaMXIhPQ2NvLD652AFX0n4UfiHpmiERAD/zVtEUlITQBPbHTec1EEUehCIDCNU36vYplu1brMAx6TxjFHJgAbDWNXP4v6223E3aiYHdk1mtvC7pFDUxAqbLyt/Wzzw8Luzu/nC4WNrwlSC2BCFgXJ9wgaIXJE/DE7EtAT+mGQd2ZN4hS7kqAZdXk/ume3I9GAvRBVZZu62ZF7UrA/GL90SyZlF84d5b+c27W+kHC/5FuGr7Z+n3j8DZ6w60jtKm4JRpiCZSCKXvzQO7eTlV3JKDptx1PoE+hq5yZmqRnn/krXSjNBSoLAm7fdQeN7NgZKH/SmepCY52cOh0JmK/UJ3V7sgD4E+PHAwPvBhJE3D22R/uKgGdtcyHnORs8CciCqeHM1CRNPPE7qi4txZqgff399K6xPZZo0pk6mSo8CShV6md1OtAB/h/Hj3viBbECMAGsLfuhC0AUyv3rOW8TPUjYrlUk8WyxkGsoq7a0igDdsx9g/uaRo6vAB/C7R++kjUPdPZ2XFy7SqYmnCHrDne799Ge0iiOvVbCKgLnyyrSuuB3M4qOHv+MQO5jpo3e/N/Ts9RJhqGvfgS9aq0dHQtzRlsENjpBLBwG6dz5QuO6Z+4H79rVETVjQvFYTVhIUs67k3hE5CChVao/rCheE6Dh6+JADl7eO3kn4iZOenniK8NOe9h046CvK4rTpU/ZEsZB/v52nRUAjULbvfIINd63aDRS2kJDZKtKjP/q+Yyurgtg4/VqW6lb7dNwioFSpf5ZIvhun4jhlMfuxCuykctfi3lVBkWMV6Ev8uWIh9z2030ZA7c8aQsQtDNziB0py/5e/qhSfI9/6hkO5axZDJ4uF/DtbBDQvR1xQOuIQlbmVJWw6H7zvEyFq8M/660d+2rIhIXcc5e7fmn+OwkBuEy6JWCugVKl9iIh+6V8smRxuEZHETsW9w1Ip4iKi8uFiIf+rBgGaQwrdCjgJJZlGG6GIaDpsGgQs1v+h/E5WiN6syxXAPF0cyL2RcRtxebG+EAIv5VnXow4AiNcM5IZ47uWVt3OOJ5SjGqLCpHdBXiYO7LJ0mSRsaKQuozxXrt/PGQgxhA3o8sKVhahSSa4+BwxZNiHdSYQf4FJl5SEi/rzuzqynk/AVrOVh1mn/aSc9TVtQFsRPc+wnsAIyE3C1HqyhTkkjp1m396u9Q2vdH7BazPMsz1dqLwlRZi7UwREP66U7wZ2IA1oQjxj0CRSvO+n2iLn7w0QXoQOq2JLqVsLt7XfzCcMfDDL6+gesOCAkxAlVlxbpn8/NeAKPPCp3VQqxWgYBZrtVVGHlsaoCmHDMr5WoiA5gSGYJQIfXSlxQl5loEZA5EWSDDwJef+uIJVomQ0bG7dx1hxW+gjAVeNeyFK7YRshyZpQwwH7Bivs8a8V82qIHShfhKDBRIw/IeLE0Z8l8O0bU1gWIE7JjQ+HcR3iK7WWz44huHL6ZbhrelglCmkpYXxAWwJl85hSdmXrWV9a3E9FNubiB75QXhGzfcTvt3LXbd2cVS5l1LcyzWg5imN1QsJjNURLIuG7oescu6NLCRYdPOUy9WDXYJaVvnLMOYumGogB8uAf9Ip1tMFTsgkCGXz3QEXCDpkyCZYpIzRjXDXwM3JbPkOUABPmfnviTJabCJtQHRYwf/LuhY6BfGnrGi5D0SZCHUzVHewVJYdAAqVvgrB3vid+24u1ECBQyCLSB75QPhz2vnVUS7tBOfbDM0Wk5ZAAeTAztMy+q8x11YSeEWY3ZDRKhE/zMFF5AuA2AqA8miyh1hV2llkMmLZeke/ZvHMqGUwSguZ1Baa0CyyWJDqThlHfH5WTJNuO2PSURl7RqddhOeYuAFMJS3KGHmiPTHHi4nUGphC46wlJSCMx66MGvOAb9hQe/GVZkJppfQ/+uBGalEZqoYYChCEu7f47QREsMVZINzk17gKHQJ6KU++cMzm0QkGx4esoDDIt/ygR4hKcnfUHDvQvCwQs7oSwk2KXaXZhJ74I8L2g0xVBiV5S8TsFZAN+rDwmfA7yvKKEjSV7SC2qE002KyqtRXmPpekkPBZK8phrXxZg0OUk/beB7TRUDTPqiNlYCjGD2yydJgxqkftuAF/dGpl9bgS5qN3dEWp8q8BvI1fn3gE8VpLEKrk4A4/U61GMdFgkZeK4m3pCzUzr0czVJ74iyA006PYn0YJO1CjL2ZFk6cKltJfKTZehG79G+eGTEfrSvsQp6T9RHpSH2s5V2w2k4bKIOMrPlVD3c2iIhQzdpMgt6q2OKny62TBS9x7sD8Z7Y491ovfd8vT8HiT1fbzfdU8qdSQiidN2lfR/v9mouaYOd/zzLXo7UPmHSWgm9j/i0ZkFU8FFBpBXQE0dXVmAUsdO+fmMRYCvm3ofcoovE2ATYW9TepwyjkaCEgHV1Yg54wg1Kh1ICbNtR73O2QeGPqYQ7NdP7oLNmAuzme5809ydCuQjqfHCjgzq/SeAPhWNzOMtCh6J+oDNMW6kQ0H54M8ncr+t5fD9gELdjkHEkDeDtvqRKQLtoyjHt1fVSuwcRJ+pCxzp9aMePuDh/10KA3eFGQHD/HiIZ0/Bu9UkiHl+WpePdvvMVB9wgZbUS0N7B5iWRu0holAzerfwhWeZpMuUUMU0UBnJP4t3mIAAlnSczBLgHitub1VdqO8gwRpjNW4h4mEi2EhmbmGRIiAaJaEOz3AoTlYV4gci8QMTnieSciPE8meZM37X5qRuYLyUNZpT6/w90zovK7G7v6wAAAABJRU5ErkJggg=='
    }
    callback(dataURL)
  }
  img.src = src
  if (img.complete || img.complete === undefined) {
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    img.src = src
  }
}
