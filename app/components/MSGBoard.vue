<script lang="ts" setup>
// 常量配置
const TRACKS_NUM = 8
const POP_PER_SECOND: [number, number] = [0, 3]

const { data: messages } = await useFetch('/api/danmaku', { method: 'GET' })

// 弹幕队列
const queue: Danmaku[] = (messages.value || []).map(msg => ({
  ...msg,
  at: new Date(msg.at),
}))
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
const emitNewDanmaku = () => {
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

const form = reactive({ githubName: '', messageContent: '' })
const { execute: sendMessage, isLoading } = useAsyncState(
  async () => {
    if (!form.githubName.trim() || !form.messageContent.trim()) return

    const { avatar, link, name } = await githubProfile(form.githubName.trim())
    const newDanmaku: NewDanmaku = {
      avatar,
      link,
      name,
      content: form.messageContent.trim(),
    }

    const [created] = await $fetch('/api/danmaku', { method: 'POST', body: newDanmaku })
    if (created) queue.push({ ...created, at: new Date(created.at) })
    form.githubName = form.messageContent = ''
  },
  null,
  { immediate: false },
)

onMounted(() => {
  emitNewDanmaku()
  const timer = setInterval(emitNewDanmaku, 500)
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
        :style="{ top: `calc(${100 / TRACKS_NUM}% * ${track - 1})`, height: `${100 / TRACKS_NUM}%` }"
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
        v-model="form.githubName"
        type="text"
        placeholder="GitHub Name"
        class="border-b flex-1 focus:outline-none focus:brightness-125"
      >
      <button
        class="size-8 flex items-center justify-center"
        :disabled="isLoading"
        @click="sendMessage()"
      >
        <Icon
          name="tabler:send-2"
          class="text-xl cursor-pointer brightness-75 hover:brightness-100 transition"
          :class="{ 'opacity-50': isLoading }"
        />
      </button>
      <input
        v-model="form.messageContent"
        type="text"
        placeholder="欢迎大家留言 (✧ω✧)"
        class="border-b flex-3 focus:outline-none focus:brightness-125"
      >
      <button
        class="size-8 flex items-center justify-center"
        :disabled="isLoading"
        @click="sendMessage()"
      >
        <Icon
          name="tabler:send-2"
          class="text-xl cursor-pointer brightness-75 hover:brightness-100 transition"
          :class="{ 'opacity-50': isLoading }"
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
