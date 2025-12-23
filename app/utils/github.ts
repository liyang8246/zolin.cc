export async function githubProfile(id: string) {
  const url = `https://api.github.com/users/${id}`
  const json = await (await fetch(url, { method: 'GET' })).json()
  return {
    avatar: json.avatar_url,
    link: json.html_url,
    name: json.name || json.login,
  }
}
