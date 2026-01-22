export function getBasePath() {
  return process.env.NODE_ENV === 'production' ? '/filipebcs8' : ''
}

export function withBasePath(path: string) {
  const basePath = getBasePath()
  if (path.startsWith('/')) {
    return `${basePath}${path}`
  }
  return `${basePath}/${path}`
}
