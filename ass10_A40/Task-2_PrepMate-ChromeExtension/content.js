// ==========================================================================
// PREPMATE CHROME EXTENSION - CONTENT SCRIPT (content.js)
// Safely analyzes visible webpage text for study reading estimation
// ==========================================================================

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request && request.action === 'ANALYZE_PAGE') {
    try {
      const stats = analyzeCurrentPage();
      sendResponse({ success: true, ...stats });
    } catch (err) {
      console.error('PrepMate: Error analyzing page content:', err);
      sendResponse({
        success: false,
        error: err.message || 'Failed to extract text from page.'
      });
    }
    return true; // Keep message channel open for async response
  }
});

/**
 * Extracts visible body text and calculates reading metrics.
 * Does NOT collect any personal, input, or password data.
 */
function analyzeCurrentPage() {
  // Clone body text excluding script, style, and hidden nodes
  const body = document.body;
  if (!body) {
    return { wordCount: 0, charCount: 0, readingTime: 0 };
  }

  // Extract visible text content safely
  const visibleText = extractVisibleText(body);

  // Clean and split words
  const cleanText = visibleText.trim().replace(/\s+/g, ' ');
  const words = cleanText.length > 0 ? cleanText.split(/\s+/).filter(w => w.length > 0) : [];
  
  const wordCount = words.length;
  const charCount = cleanText.length;

  // Average reading speed: 200 words per minute
  const readingTime = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0;

  return {
    wordCount: wordCount.toLocaleString(),
    charCount: charCount.toLocaleString(),
    readingTime: readingTime
  };
}

/**
 * Traverses DOM tree ignoring script, style, nav, and hidden elements.
 */
function extractVisibleText(rootNode) {
  let text = '';
  const walker = document.createTreeWalker(
    rootNode,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const tag = parent.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'svg', 'canvas', 'iframe'].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }

        // Check if visible
        try {
          const style = window.getComputedStyle(parent);
          if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            return NodeFilter.FILTER_REJECT;
          }
        } catch (e) {
          // In case computed style fails
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  let currentNode;
  while ((currentNode = walker.nextNode())) {
    text += ' ' + currentNode.nodeValue;
  }

  return text;
}
