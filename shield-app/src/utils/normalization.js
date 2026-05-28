export const normalizePhoneNumber = (phone) => {
  if (!phone) return ''
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '')

  // If it's a Panama number without +507 (assuming 8 digits)
  if (cleaned.length === 8) {
    return '507' + cleaned
  }

  return cleaned
}

export const normalizeUrl = (url) => {
  if (!url) return ''
  try {
    let cleaned = url.toLowerCase().trim()
    // Remove protocol
    cleaned = cleaned.replace(/^(https?:\/\/)/, '')
    // Remove www.
    cleaned = cleaned.replace(/^www\./, '')
    // Remove trailing slash
    cleaned = cleaned.replace(/\/$/, '')
    return cleaned
  } catch (e) {
    return url
  }
}

export const normalizeEvidence = (type, value) => {
  if (type === 'whatsapp' || type === 'hacked_number') return normalizePhoneNumber(value)
  if (type === 'link') return normalizeUrl(value)
  return value.trim() // For bank accounts
}
