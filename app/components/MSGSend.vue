<script lang="ts" setup>
const emit = defineEmits<{
  'message-sent': [Danmaku]
}>()

const form = reactive({ githubName: '', messageContent: '' })
const githubUser = ref<{ avatar: string, link: string, name: string } | null>(null)

const { execute: fetchGithubUser, isLoading: isFetchingUser } = useAsyncState(
  async () => {
    if (!form.githubName.trim()) return

    try {
      const { avatar, link, name } = await githubProfile(form.githubName.trim())
      if (!name) throw new Error('No name found')
      githubUser.value = { avatar, link, name }
    }
    catch {
      githubUser.value = {
        avatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0xMiAxLjY3Yy45NTUgMCAxLjg0NS40NjcgMi4zOSAxLjI0N2wuMTA1LjE2bDguMTE0IDEzLjU0OGEyLjkxNCAyLjkxNCAwIDAgMS0yLjMwNyA0LjM2M2wtLjE5NS4wMDhIMy44ODJhMi45MTQgMi45MTQgMCAwIDEtMi41ODItNC4ybC4wOTktLjE4NWw4LjExLTEzLjUzOEEyLjkxIDIuOTEgMCAwIDEgMTIgMS42N00xMi4wMSAxNWwtLjEyNy4wMDdhMSAxIDAgMCAwIDAgMS45ODZMMTIgMTdsLjEyNy0uMDA3YTEgMSAwIDAgMCAwLTEuOTg2ek0xMiA4YTEgMSAwIDAgMC0uOTkzLjg4M0wxMSA5djRsLjAwNy4xMTdhMSAxIDAgMCAwIDEuOTg2IDBMMTMgMTNWOWwtLjAwNy0uMTE3QTEgMSAwIDAgMCAxMiA4Ii8+PC9zdmc+',
        link: '',
        name: '错误',
      }
      console.warn('Failed to fetch GitHub user:', form.githubName)
    }
  },
  null,
  { immediate: false },
)

const { execute: sendMessage, isLoading: isSendingMessage } = useAsyncState(
  async () => {
    if (!githubUser.value || !form.messageContent.trim()) return

    const newDanmaku: NewDanmaku = {
      avatar: githubUser.value.avatar,
      link: githubUser.value.link,
      name: githubUser.value.name,
      content: form.messageContent.trim(),
    }

    const [created] = await $fetch('/api/danmaku', { method: 'POST', body: newDanmaku })
    emit('message-sent', { ...created!, at: new Date(created!.at) })
    form.githubName = form.messageContent = ''
    githubUser.value = null
  },
  null,
  { immediate: false },
)

const canFetchGithub = computed(() => form.githubName.trim().length > 0 && !githubUser.value?.link)
const canSendMessage = computed(() => githubUser.value?.link && form.messageContent.trim().length > 0)
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-2 px-2 h-20 lg:h-8">
    <div class="flex gap-2 flex-1">
      <input
        v-model="form.githubName"
        type="text"
        placeholder="GitHub Name"
        class="border-b border-zinc-600 flex-1 transition-all focus:outline-none focus:brightness-125"
      >
      <button
        class="size-8 flex items-center justify-center cursor-pointer disabled:brightness-50 disabled:cursor-not-allowed brightness-75 hover:brightness-100"
        :disabled="!canFetchGithub || isFetchingUser"
        @click="fetchGithubUser()"
      >
        <Icon
          :name="isFetchingUser ? 'tabler:loader' : 'tabler:brand-github'"
          class="text-xl"
          :class="{ 'animate-spin': isFetchingUser }"
        />
      </button>
    </div>
    <div class="flex gap-2 flex-2">
      <div
        v-if="githubUser?.avatar && githubUser.name"
        class="flex items-center gap-1 border-b border-zinc-600"
      >
        <NuxtImg
          :src="githubUser.avatar"
          class="size-5 rounded"
        />
        <span
          class="text-sm flex items-center"
        >{{ githubUser.name }}</span>
      </div>
      <input
        v-model="form.messageContent"
        type="text"
        placeholder="欢迎大家留言"
        class="border-b border-zinc-600 flex-1 transition-all focus:outline-none focus:brightness-125"
      >
      <button
        class="size-8 flex items-center justify-center cursor-pointer disabled:brightness-50 disabled:cursor-not-allowed brightness-75 hover:brightness-100"
        :disabled="!canSendMessage || isSendingMessage"
        @click="sendMessage()"
      >
        <Icon
          :name="isSendingMessage ? 'tabler:loader' : 'tabler:send-2'"
          class="text-xl"
          :class="{ 'animate-spin': isSendingMessage }"
        />
      </button>
    </div>
  </div>
</template>
