import { NextRequest } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Alok345";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action") || "repos";

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    if (action === "repos") {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
        { headers, next: { revalidate: 3600 } }
      );

      if (!res.ok) {
        return Response.json({ error: "GitHub API error", repos: [] }, { status: res.status });
      }

      const repos = await res.json();
      const mapped = repos
        .filter((r: any) => !r.fork)
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || "",
          htmlUrl: r.html_url,
          homepage: r.homepage || "",
          language: r.language || "",
          topics: r.topics || [],
          starCount: r.stargazers_count,
          updatedAt: r.updated_at,
          createdAt: r.created_at,
        }));

      return Response.json({ repos: mapped });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("GitHub API error:", error);
    return Response.json({ error: "Failed to fetch repos" }, { status: 500 });
  }
}
