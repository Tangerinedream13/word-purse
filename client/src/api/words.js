const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080"

export async function listWords({ page = 1, limit = 20 } = {}) {
  const res = await fetch(`${BASE}/api/words?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error("Failed to fetch words")
  return res.json()
}

export async function getWord(id) {
  const res = await fetch(`${BASE}/api/words/${id}`)
  if (!res.ok) throw new Error("Word not found")
  return res.json()
}

export async function searchWords(q) {
  const res = await fetch(`${BASE}/api/words/search?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error("Search failed")
  return res.json()
}

export async function createWord(data) {
  const res = await fetch(`${BASE}/api/words`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to add word" }))
    throw new Error(err.error || "Failed to add word")
  }
  return res.json()
}

export async function upvoteWord(id) {
  const res = await fetch(`${BASE}/api/words/${id}/upvote`, { method: "PUT" })
  if (!res.ok) throw new Error("Failed to upvote")
  return res.json()
}
