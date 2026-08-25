export interface Env {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
}

interface RsvpPayload {
  code: string;
  fullName: string;
  attending: string;
  guestCount: string;
  mealPreference: string;
  songRequest?: string;
  message?: string;
}

interface MessagePayload {
  senderName: string;
  message: string;
}

interface RsvpRow {
  id: number;
  code: string;
  full_name: string;
  attending: string;
  guest_count: string;
  meal_preference: string;
  song_request?: string | null;
  message?: string | null;
  created_at: string;
  ip_address?: string | null;
}

interface MessageRow {
  id: number;
  sender_name: string;
  message: string;
  created_at: string;
  ip_address?: string | null;
}

interface CountResult {
  total: number;
}

interface AcceptedResult {
  count: number;
  totalGuests: number | null;
}

const DEFAULT_ADMIN_PASSWORD = "Melkazom2027!SecurePass@Enugu";

function getCorsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Password",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(),
    },
  });
}

function verifyAuth(request: Request, env: Env): boolean {
  const adminPass = env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  // 1. Check Header
  const customHeader = request.headers.get("X-Admin-Password");
  if (customHeader && customHeader === adminPass) return true;

  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    if (authHeader.startsWith("Bearer ") && authHeader.slice(7) === adminPass) return true;
    if (authHeader.startsWith("Basic ")) {
      try {
        const decoded = atob(authHeader.slice(6));
        const parts = decoded.split(":");
        if (parts[1] === adminPass || parts[0] === adminPass) return true;
      } catch {
        // ignore
      }
    }
  }

  // 2. Check Query parameter
  const url = new URL(request.url);
  const queryPass = url.searchParams.get("password") || url.searchParams.get("auth");
  if (queryPass && queryPass === adminPass) return true;

  // 3. Check Cookie
  const cookies = request.headers.get("Cookie") || "";
  if (cookies.includes(`melkazom_auth=${encodeURIComponent(adminPass)}`)) return true;

  return false;
}

function escapeCsvField(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle preflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(),
      });
    }

    const clientIp = request.headers.get("CF-Connecting-IP") || "";

    // -----------------------------------------------------------------------
    // 1. POST /api/rsvp - Submit / Update RSVP
    // -----------------------------------------------------------------------
    if (request.method === "POST" && (path === "/api/rsvp" || path === "/api/rsvps")) {
      try {
        const body = (await request.json()) as RsvpPayload;
        if (!body.fullName || !body.code) {
          return jsonResponse({ error: "Full name and receipt code are required." }, 400);
        }

        const existing = await env.DB.prepare("SELECT id FROM rsvps WHERE code = ?")
          .bind(body.code)
          .first();

        if (existing) {
          await env.DB.prepare(
            `UPDATE rsvps 
             SET full_name = ?, attending = ?, guest_count = ?, meal_preference = ?, song_request = ?, message = ?, ip_address = ?
             WHERE code = ?`
          )
            .bind(
              body.fullName.trim(),
              body.attending || "yes",
              body.guestCount || "1",
              body.mealPreference || "meat",
              body.songRequest?.trim() || "",
              body.message?.trim() || "",
              clientIp,
              body.code
            )
            .run();
        } else {
          await env.DB.prepare(
            `INSERT INTO rsvps (code, full_name, attending, guest_count, meal_preference, song_request, message, ip_address)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          )
            .bind(
              body.code,
              body.fullName.trim(),
              body.attending || "yes",
              body.guestCount || "1",
              body.mealPreference || "meat",
              body.songRequest?.trim() || "",
              body.message?.trim() || "",
              clientIp
            )
            .run();
        }

        return jsonResponse({ success: true, message: "RSVP recorded successfully.", code: body.code }, 200);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : "Failed to record RSVP";
        return jsonResponse({ error: errMsg }, 500);
      }
    }

    // -----------------------------------------------------------------------
    // 2. POST /api/messages - Submit Wedding Message / Blessing
    // -----------------------------------------------------------------------
    if (request.method === "POST" && path === "/api/messages") {
      try {
        const body = (await request.json()) as MessagePayload;
        if (!body.senderName || !body.message) {
          return jsonResponse({ error: "Sender name and message are required." }, 400);
        }

        await env.DB.prepare(
          "INSERT INTO messages (sender_name, message, ip_address) VALUES (?, ?, ?)"
        )
          .bind(body.senderName.trim(), body.message.trim(), clientIp)
          .run();

        return jsonResponse({ success: true, message: "Message sent with love to the couple!" }, 200);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : "Failed to save message";
        return jsonResponse({ error: errMsg }, 500);
      }
    }

    // -----------------------------------------------------------------------
    // 3. GET /api/admin/login - Authenticate and set cookie
    // -----------------------------------------------------------------------
    if (request.method === "POST" && path === "/api/admin/login") {
      try {
        const body = (await request.json()) as { password?: string };
        const adminPass = env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
        if (body.password === adminPass) {
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": `melkazom_auth=${encodeURIComponent(adminPass)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`,
              ...getCorsHeaders(),
            },
          });
        }
        return jsonResponse({ error: "Invalid admin password" }, 401);
      } catch {
        return jsonResponse({ error: "Invalid request" }, 400);
      }
    }

    // -----------------------------------------------------------------------
    // 4. API Endpoints (Password Protected)
    // -----------------------------------------------------------------------
    if (path.startsWith("/api/rsvps") || path.startsWith("/api/messages") || path.startsWith("/api/export") || path.startsWith("/api/stats")) {
      if (!verifyAuth(request, env)) {
        return jsonResponse({ error: "Unauthorized. Provide valid admin password in Header, Query, or Cookie." }, 401);
      }

      // Stats
      if (path === "/api/stats") {
        const totalRsvps = await env.DB.prepare("SELECT COUNT(*) as total FROM rsvps").first<CountResult>();
        const accepted = await env.DB.prepare("SELECT COUNT(*) as count, SUM(CAST(guest_count AS INTEGER)) as totalGuests FROM rsvps WHERE attending = 'yes'").first<AcceptedResult>();
        const declined = await env.DB.prepare("SELECT COUNT(*) as total FROM rsvps WHERE attending = 'no'").first<CountResult>();
        const totalMessages = await env.DB.prepare("SELECT COUNT(*) as total FROM messages").first<CountResult>();

        return jsonResponse({
          totalRsvps: totalRsvps?.total || 0,
          totalAccepted: accepted?.count || 0,
          totalHeadcount: accepted?.totalGuests || 0,
          totalDeclined: declined?.total || 0,
          totalMessages: totalMessages?.total || 0,
        }, 200);
      }

      // Get RSVPs List
      if (path === "/api/rsvps" && request.method === "GET") {
        const results = await env.DB.prepare("SELECT * FROM rsvps ORDER BY created_at DESC").all<RsvpRow>();
        return jsonResponse({ rsvps: results.results }, 200);
      }

      // Get Messages List
      if (path === "/api/messages" && request.method === "GET") {
        const results = await env.DB.prepare("SELECT * FROM messages ORDER BY created_at DESC").all<MessageRow>();
        return jsonResponse({ messages: results.results }, 200);
      }

      // CSV Export - RSVPs
      if (path === "/api/export/rsvps.csv") {
        const results = await env.DB.prepare("SELECT * FROM rsvps ORDER BY created_at DESC").all<RsvpRow>();
        const rows = results.results || [];
        let csv = "ID,Code,Full Name,Attending,Party Size,Meal Preference,Song Request,Message,Submission Date\n";
        for (const r of rows) {
          csv += [
            r.id,
            escapeCsvField(r.code),
            escapeCsvField(r.full_name),
            escapeCsvField(r.attending),
            escapeCsvField(r.guest_count),
            escapeCsvField(r.meal_preference),
            escapeCsvField(r.song_request),
            escapeCsvField(r.message),
            escapeCsvField(r.created_at),
          ].join(",") + "\n";
        }
        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="melkazom-rsvps-${Date.now()}.csv"`,
            ...getCorsHeaders(),
          },
        });
      }

      // CSV Export - Messages
      if (path === "/api/export/messages.csv") {
        const results = await env.DB.prepare("SELECT * FROM messages ORDER BY created_at DESC").all<MessageRow>();
        const rows = results.results || [];
        let csv = "ID,Sender Name,Message,Submitted At\n";
        for (const m of rows) {
          csv += [
            m.id,
            escapeCsvField(m.sender_name),
            escapeCsvField(m.message),
            escapeCsvField(m.created_at),
          ].join(",") + "\n";
        }
        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="melkazom-messages-${Date.now()}.csv"`,
            ...getCorsHeaders(),
          },
        });
      }
    }

    // -----------------------------------------------------------------------
    // 5. GET /admin - Interactive Password Protected Web Dashboard
    // -----------------------------------------------------------------------
    if (path === "/admin" || path === "/admin/") {
      const isAuth = verifyAuth(request, env);
      return new Response(renderAdminHtml(isAuth), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Root Welcome
    return jsonResponse({
      service: "Melkazom Wedding Backend",
      endpoints: {
        rsvp: "POST /api/rsvp",
        messages: "POST /api/messages",
        admin_dashboard: "GET /admin",
        download_rsvps_csv: "GET /api/export/rsvps.csv?password=YOUR_PASSWORD",
        download_messages_csv: "GET /api/export/messages.csv?password=YOUR_PASSWORD",
      },
    }, 200);
  },
};

function renderAdminHtml(isAuthenticated: boolean): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Melkazom Admin Portal • RSVP & Guest Ledger</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Montserrat', sans-serif; background-color: #fbf5ea; color: #4a2d28; }
    .font-serif-title { font-family: 'Cormorant Garamond', serif; }
    .font-script { font-family: 'Great Vibes', cursive; }
  </style>
</head>
<body class="min-h-screen p-4 sm:p-8">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <header class="text-center mb-8 border-b border-[#b7934b]/30 pb-6">
      <h1 class="font-script text-5xl sm:text-6xl text-[#4a2d28]">Melford & Chiazokam</h1>
      <p class="font-serif-title text-sm tracking-[0.25em] text-[#b7934b] uppercase mt-1 font-semibold">Wedding Guest Ledger & RSVP Admin Portal</p>
    </header>

    ${!isAuthenticated ? `
      <!-- Password Protection Form -->
      <div class="max-w-md mx-auto bg-[#fdfaf5] p-8 rounded-3xl border border-[#b7934b]/40 shadow-xl text-center">
        <div class="h-12 w-12 mx-auto mb-4 rounded-full bg-[#b7934b]/20 flex items-center justify-center text-[#b7934b] text-xl font-bold">🔒</div>
        <h2 class="font-serif-title text-2xl font-bold text-[#4a2d28] mb-2">Private Admin Access</h2>
        <p class="text-xs text-[#7a5c4e] mb-6">Enter the master wedding security key to view guest attendance and download CSV files.</p>
        
        <form id="loginForm" class="space-y-4">
          <input type="password" id="passInput" required placeholder="Enter master admin password" class="w-full px-4 py-3 rounded-2xl border border-[#b7934b]/40 bg-white text-sm outline-none focus:ring-2 focus:ring-[#b7934b]">
          <button type="submit" class="w-full py-3 bg-[#b7934b] hover:bg-[#967434] text-white font-semibold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md">Unlock Ledger</button>
        </form>
        <p id="errorMsg" class="text-xs text-red-600 mt-3 hidden"></p>
      </div>

      <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const pass = document.getElementById('passInput').value;
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ password: pass })
          });
          if (res.ok) {
            window.location.reload();
          } else {
            const err = document.getElementById('errorMsg');
            err.textContent = 'Incorrect admin password. Please try again.';
            err.classList.remove('hidden');
          }
        });
      </script>
    ` : `
      <!-- Authenticated Dashboard -->
      <div id="dashboard" class="space-y-8">
        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-[#fdfaf5] p-5 rounded-2xl border border-[#b7934b]/30 shadow-xs text-center">
            <p class="text-[10px] tracking-wider uppercase text-[#7a5c4e] font-semibold">Total Responses</p>
            <p id="statTotal" class="font-serif-title text-3xl font-bold text-[#4a2d28] mt-1">-</p>
          </div>
          <div class="bg-[#fdfaf5] p-5 rounded-2xl border border-[#b7934b]/30 shadow-xs text-center">
            <p class="text-[10px] tracking-wider uppercase text-[#0E3B2E] font-semibold">Total Headcount</p>
            <p id="statGuests" class="font-serif-title text-3xl font-bold text-[#0E3B2E] mt-1">-</p>
          </div>
          <div class="bg-[#fdfaf5] p-5 rounded-2xl border border-[#b7934b]/30 shadow-xs text-center">
            <p class="text-[10px] tracking-wider uppercase text-[#964b4b] font-semibold">Declined</p>
            <p id="statDeclined" class="font-serif-title text-3xl font-bold text-[#964b4b] mt-1">-</p>
          </div>
          <div class="bg-[#fdfaf5] p-5 rounded-2xl border border-[#b7934b]/30 shadow-xs text-center">
            <p class="text-[10px] tracking-wider uppercase text-[#b7934b] font-semibold">Guest Messages</p>
            <p id="statMessages" class="font-serif-title text-3xl font-bold text-[#b7934b] mt-1">-</p>
          </div>
        </div>

        <!-- Action Bar: Export Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-4 bg-[#fdfaf5] p-4 rounded-2xl border border-[#b7934b]/30 shadow-xs">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-[#4a2d28] uppercase tracking-wider">Export Data:</span>
            <a href="/api/export/rsvps.csv" class="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0E3B2E] hover:bg-[#092b21] text-white rounded-full text-xs font-semibold tracking-wider transition-all shadow-xs">
              📥 Download RSVPs (.CSV)
            </a>
            <a href="/api/export/messages.csv" class="inline-flex items-center gap-1.5 px-4 py-2 bg-[#b7934b] hover:bg-[#967434] text-white rounded-full text-xs font-semibold tracking-wider transition-all shadow-xs">
              💌 Download Messages (.CSV)
            </a>
          </div>
          <button onclick="logout()" class="text-xs text-[#7a5c4e] hover:text-[#964b4b] underline">Log out</button>
        </div>

        <!-- Section 1: RSVPs Table -->
        <div class="bg-[#fdfaf5] p-6 rounded-3xl border border-[#b7934b]/30 shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="font-serif-title text-2xl font-bold text-[#4a2d28]">Guest RSVP Ledger</h2>
            <input type="text" id="searchInput" onkeyup="filterRsvps()" placeholder="Search guest name or code..." class="px-3 py-1.5 text-xs rounded-xl border border-[#b7934b]/30 bg-white outline-none">
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-[#b7934b]/25 text-[#7a5c4e] uppercase font-semibold">
                  <th class="py-2.5 px-2">Code</th>
                  <th class="py-2.5 px-2">Full Name</th>
                  <th class="py-2.5 px-2">Status</th>
                  <th class="py-2.5 px-2">Party</th>
                  <th class="py-2.5 px-2">Meal</th>
                  <th class="py-2.5 px-2">Song Request</th>
                  <th class="py-2.5 px-2">Message</th>
                  <th class="py-2.5 px-2">Date</th>
                </tr>
              </thead>
              <tbody id="rsvpTableBody" class="divide-y divide-[#b7934b]/15">
                <tr><td colspan="8" class="text-center py-6 text-gray-500">Loading RSVP responses...</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 2: Messages Stream -->
        <div class="bg-[#fdfaf5] p-6 rounded-3xl border border-[#b7934b]/30 shadow-md">
          <h2 class="font-serif-title text-2xl font-bold text-[#4a2d28] mb-4">Guest Prayers & Congratulations</h2>
          <div id="messagesList" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="text-gray-500 text-xs">Loading messages...</div>
          </div>
        </div>
      </div>

      <script>
        let allRsvps = [];

        async function loadDashboard() {
          try {
            // Load Stats
            const statsRes = await fetch('/api/stats');
            if (statsRes.ok) {
              const stats = await statsRes.json();
              document.getElementById('statTotal').textContent = stats.totalRsvps;
              document.getElementById('statGuests').textContent = stats.totalHeadcount;
              document.getElementById('statDeclined').textContent = stats.totalDeclined;
              document.getElementById('statMessages').textContent = stats.totalMessages;
            }

            // Load RSVPs
            const rsvpsRes = await fetch('/api/rsvps');
            if (rsvpsRes.ok) {
              const data = await rsvpsRes.json();
              allRsvps = data.rsvps || [];
              renderRsvps(allRsvps);
            }

            // Load Messages
            const msgRes = await fetch('/api/messages');
            if (msgRes.ok) {
              const data = await msgRes.json();
              renderMessages(data.messages || []);
            }
          } catch(err) {
            console.error('Error loading data', err);
          }
        }

        function renderRsvps(rsvps) {
          const tbody = document.getElementById('rsvpTableBody');
          if (!rsvps.length) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center py-6 text-gray-400">No RSVP entries yet.</td></tr>';
            return;
          }
          tbody.innerHTML = rsvps.map(r => \`
            <tr class="hover:bg-white/60 transition-colors">
              <td class="py-2.5 px-2 font-mono font-bold text-[#b7934b]">\${r.code || '-'}</td>
              <td class="py-2.5 px-2 font-semibold text-[#4a2d28]">\${r.full_name}</td>
              <td class="py-2.5 px-2">
                <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold \${r.attending === 'yes' ? 'bg-[#0E3B2E]/15 text-[#0E3B2E]' : 'bg-red-100 text-red-700'}">
                  \${r.attending === 'yes' ? 'Accepted' : 'Declined'}
                </span>
              </td>
              <td class="py-2.5 px-2 font-medium">\${r.guest_count}</td>
              <td class="py-2.5 px-2 capitalize">\${r.meal_preference || '-'}</td>
              <td class="py-2.5 px-2 italic text-gray-600 max-w-xs truncate">\${r.song_request || '-'}</td>
              <td class="py-2.5 px-2 text-gray-600 max-w-xs truncate">\${r.message || '-'}</td>
              <td class="py-2.5 px-2 text-gray-500 whitespace-nowrap">\${new Date(r.created_at).toLocaleDateString()}</td>
            </tr>
          \`).join('');
        }

        function renderMessages(messages) {
          const container = document.getElementById('messagesList');
          if (!messages.length) {
            container.innerHTML = '<p class="text-xs text-gray-400">No messages submitted yet.</p>';
            return;
          }
          container.innerHTML = messages.map(m => \`
            <div class="bg-white p-4 rounded-2xl border border-[#b7934b]/20 shadow-xs space-y-2">
              <div class="flex justify-between items-center">
                <p class="font-serif-title font-bold text-[#4a2d28] text-sm">\${m.sender_name}</p>
                <span class="text-[10px] text-gray-400">\${new Date(m.created_at).toLocaleDateString()}</span>
              </div>
              <p class="text-xs italic text-[#5c3f39] leading-relaxed">"\${m.message}"</p>
            </div>
          \`).join('');
        }

        function filterRsvps() {
          const q = document.getElementById('searchInput').value.toLowerCase();
          const filtered = allRsvps.filter(r => 
            (r.full_name && r.full_name.toLowerCase().includes(q)) || 
            (r.code && r.code.toLowerCase().includes(q)) ||
            (r.song_request && r.song_request.toLowerCase().includes(q))
          );
          renderRsvps(filtered);
        }

        function logout() {
          document.cookie = "melkazom_auth=; Path=/; Max-Age=0";
          window.location.reload();
        }

        loadDashboard();
      </script>
    `}
  </div>
</body>
</html>`;
}
