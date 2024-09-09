export function createUniqueIdentifier(newsItem) 
{
  // Implement your logic to create a unique identifier
  return `${newsItem.publishedAt}-${newsItem.url}`
}
