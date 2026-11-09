const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(endpoint, { signal } = {}) {
  const response = await fetch(`${apiBaseUrl}/api/${endpoint}/`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  throw new Error('The API response did not contain a collection.')
}
