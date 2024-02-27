export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  
  if (!current || !url) {
    return false
  }

  if (current.toLocaleString() === url) {
    return true
  }

  if (current.indexOf(url) > -1) {
    return true
  }

  return false
}
