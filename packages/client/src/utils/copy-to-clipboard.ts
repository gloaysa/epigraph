export async function copyCitationToClipboard(text: string, author: string, bookTitle: string) {
  const citation = `"${text}"\n\n— ${bookTitle}, by ${author}`;

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(citation);
    return;
  }

  // Fallback (older browsers / some PWAs)
  const textarea = document.createElement('textarea');
  textarea.value = citation;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
