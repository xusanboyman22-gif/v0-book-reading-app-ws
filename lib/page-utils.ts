// Utility to calculate pages from content
export function calculatePages(content: string, charsPerPage = 1500): number {
  if (!content) return 0
  const paragraphs = content.split("\n\n")
  let pages = 0
  let currentPageLength = 0

  for (const paragraph of paragraphs) {
    if (currentPageLength + paragraph.length > charsPerPage && currentPageLength > 0) {
      pages++
      currentPageLength = paragraph.length
    } else {
      currentPageLength += paragraph.length
    }
  }

  if (currentPageLength > 0) {
    pages++
  }

  return Math.max(1, pages)
}

export function splitContentIntoPages(content: string, charsPerPage = 1500): string[] {
  const paragraphs = content.split("\n\n")
  const pages: string[] = []
  let currentPage = ""

  for (const paragraph of paragraphs) {
    if ((currentPage + paragraph).length > charsPerPage && currentPage.length > 0) {
      pages.push(currentPage.trim())
      currentPage = paragraph + "\n\n"
    } else {
      currentPage += paragraph + "\n\n"
    }
  }

  if (currentPage.trim()) {
    pages.push(currentPage.trim())
  }

  return pages.length > 0 ? pages : ["Bu kitobda hozircha kontent mavjud emas."]
}
