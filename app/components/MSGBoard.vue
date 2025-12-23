<script lang="ts" setup>
export interface Danmaku {
  id: number
  avatar: string
  name: string
  content: string
  link?: string
}

// 常量配置
const TRACKS_NUM = 8
const POP_PER_SECOND: [number, number] = [0, 3]

// 默认弹幕数据
const defaultMessages: Danmaku[] = [
  { id: 1, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '游戏爱好者', content: '这个效果太酷了！' },
  { id: 2, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '设计师', content: 'UI 设计很棒' },
  { id: 3, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '程序员', content: '代码写得很优雅' },
  { id: 4, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '用户', content: '体验非常好！' },
  { id: 5, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '开发者', content: '性能很不错' },
  { id: 6, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '测试员', content: '没有发现 bug' },
  { id: 7, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '访客', content: '期待更多内容' },
  { id: 8, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '粉丝', content: '支持博主！' },
  { id: 9, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '新人', content: '第一次来访~' },
  { id: 10, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '路人甲', content: '从这里飘过...' },
  { id: 11, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '小明', content: 'Hello World!' },
  { id: 12, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '测试者', content: '弹幕测试消息 123' },
  { id: 13, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '观众', content: '效果真不错！' },
  { id: 14, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '学习者', content: '学到了很多东西' },
  { id: 15, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '技术宅', content: '这个实现很有意思' },
  { id: 16, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '前端工程师', content: 'Vue3 真香！' },
  { id: 17, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '后端开发', content: '前端也挺有趣的' },
  { id: 18, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '全栈开发', content: '全栈才是王道' },
  { id: 19, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '产品经理', content: '这个功能很实用' },
  { id: 20, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '运营', content: '用户会喜欢的' },
  { id: 21, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '架构师', content: '架构设计合理' },
  { id: 22, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '博客读者', content: '文章写得很好！' },
  { id: 23, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '代码审查员', content: '代码质量不错' },
  { id: 24, avatar: 'https://book.paperee.guru/ebcat.jpg', name: '极客', content: 'Geek style~' },
]

// 弹幕队列
const queue: Danmaku[] = [...defaultMessages]
// 轨道信息
const trackItems = ref<Map<number, Danmaku[]>>(new Map())
const trackLastEmitTime = new Map<number, number>()
const trackSpeeds = Array.from({ length: TRACKS_NUM }, (_, i) => {
  trackItems.value.set(i, [])
  trackLastEmitTime.set(i, 0)
  return 6 + Math.random() * 8
})

// 弹幕滚动完成，回到队尾
const onAnimationEnd = (track: number, danmaku: Danmaku) => {
  trackItems.value.get(track)!.splice(
    trackItems.value.get(track)!.findIndex(d => d.id === danmaku.id),
    1,
  )
  queue.push(danmaku)
}

// 发射弹幕
const emitDanmaku = () => {
  const count = Math.floor(Math.random() * (POP_PER_SECOND[1] - POP_PER_SECOND[0] + 1)) + POP_PER_SECOND[0]
  if (queue.length === 0) return

  const now = Date.now()
  const sortedTracks = Array.from({ length: TRACKS_NUM }, (_, i) => ({
    index: i,
    lastTime: trackLastEmitTime.get(i)!,
  })).sort((a, b) => a.lastTime - b.lastTime)

  for (let i = 0; i < Math.min(count, queue.length); i++) {
    const track = sortedTracks[i]!.index
    trackItems.value.get(track)!.push(queue.shift()!)
    trackLastEmitTime.set(track, now)
  }
}

const trackHeight = computed(() => `${100 / TRACKS_NUM}%`)

onMounted(() => {
  emitDanmaku()
  const timer = setInterval(emitDanmaku, 500)
  onUnmounted(() => clearInterval(timer))
})
</script>

<template>
  <div class="flex flex-col max-w-200 w-full h-84 py-4 bg-zinc-950 rounded-xl">
    <div class="h-full overflow-hidden relative">
      <div
        v-for="track in TRACKS_NUM"
        :key="track"
        class="absolute left-0 w-full flex items-center"
        :style="{ top: `calc(${trackHeight} * ${track - 1})`, height: trackHeight }"
      >
        <div
          v-for="danmaku in trackItems.get(track - 1) || []"
          :key="danmaku.id"
          class="danmaku-item absolute whitespace-nowrap"
          :style="{ animationDuration: `${trackSpeeds[track - 1]}s` }"
          @animationend="onAnimationEnd(track - 1, danmaku)"
        >
          <MSGItem v-bind="danmaku" />
        </div>
      </div>
    </div>
    <div class="flex gap-2 px-2 h-8">
      <input
        type="text"
        placeholder="GitHub Name"
        class="border-b flex-1 focus:outline-none focus:brightness-125"
      >
      <input
        type="text"
        placeholder="欢迎留言 (✧ω✧)"
        class="border-b flex-3 focus:outline-none focus:brightness-125"
      >
      <button class="size-8 flex items-center justify-center">
        <Icon
          name="tabler:send-2"
          class="text-xl cursor-pointer brightness-75 hover:brightness-100 transition"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.danmaku-item {
  animation: scroll-left linear forwards;
}

@keyframes scroll-left {
  from {
    transform: translateX(calc(200 * 4px));
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
