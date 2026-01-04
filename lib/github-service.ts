// lib/github-service.ts

// HARDCODED CONFIGURATION
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_OWNER = "xusanboyman22-gif";
const GITHUB_REPO = "v0-book-reading-app-ws";
const BRANCH = "main";

export interface GithubFileParams {
  path: string;
  content: string | ArrayBuffer;
  message: string;
  isBinary?: boolean;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function utf8_to_b64(str: string): string {
  // Handles special characters in title/author names
  return btoa(unescape(encodeURIComponent(str)));
}


export async function uploadToGithub({ path, content, message, isBinary = false }: any) {
  if (!GITHUB_TOKEN) {
    throw new Error("GitHub Token topilmadi. .env.local faylini tekshiring.");
  }

  // Convert content to Base64 for GitHub API
  let base64Content = "";
  if (isBinary) {
    const bytes = new Uint8Array(content);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    base64Content = btoa(binary);
  } else {
    base64Content = btoa(unescape(encodeURIComponent(content)));
  }

  const response = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: base64Content,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "GitHub-ga yuklashda xatolik yuz berdi");
  }

  return await response.json();
}

  // 2. Prepare content
  let contentBase64 = "";
  if (isBinary && content instanceof ArrayBuffer) {
    contentBase64 = arrayBufferToBase64(content);
  } else if (typeof content === "string") {
    contentBase64 = utf8_to_b64(content);
  }


  export async function fetchAllBooks() {
  const GITHUB_OWNER = "xusanboyman22-gif";
  const GITHUB_REPO = "v0-book-reading-app-ws";
  // No token strictly needed for GET on public repos, but using it avoids rate limits
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  try {
    // 1. Get the list of folders in 'library/'
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/library`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: 'no-store'
      }
    );

    if (!res.ok) return [];

    const folders = await res.json();
    const books = [];

    // 2. For each folder, grab the metadata.json
    for (const folder of folders) {
      if (folder.type === 'dir') {
        const metaRes = await fetch(
          `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/library/${folder.name}/metadata.json`
        );
        if (metaRes.ok) {
          const metaData = await metaRes.json();
          books.push(metaData);
        }
      }
    }
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
  // 3. PUT Request to GitHub
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: BRANCH,
      sha 
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub Upload Error: ${errorText}`);
  }

  return await response.json();
}
