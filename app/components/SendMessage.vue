<script lang="ts" setup>
const emit = defineEmits<{
  'message-sent': [Danmaku]
}>()

const form = reactive({ githubName: '', messageContent: '' })
const githubUser = ref<{ avatar: string, link: string, name: string } | null>(null)

const { execute: fetchGithubUser, isLoading: isFetchingUser } = useAsyncState(
  async () => {
    if (!form.githubName.trim()) return

    const { avatar, link, name } = await githubProfile(form.githubName.trim())
    githubUser.value = { avatar, link, name }
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
    console.log('Created danmaku:', created)
    emit('message-sent', { ...created!, at: new Date(created!.at) })
    form.githubName = form.messageContent = ''
    githubUser.value = null
  },
  null,
  { immediate: false },
)

const canFetchGithub = computed(() => form.githubName.trim().length > 0 && !githubUser.value)
const canSendMessage = computed(() => githubUser.value !== null && form.messageContent.trim().length > 0)
</script>

<template>
  <div class="flex gap-2 px-2 h-8">
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
      >{{ githubUser.name + ':' }}</span>
    </div>
    <input
      v-model="form.messageContent"
      type="text"
      placeholder="欢迎大家留言 (✧ω✧)"
      class="border-b border-zinc-600 flex-3 transition-all focus:outline-none focus:brightness-125"
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
</template>
