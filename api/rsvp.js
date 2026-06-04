const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM    = '"Mahbub & Zarin ♥" <rsvp@notifications.calonaisolutions.com>';
const COUPLE  = 'mahbubulaom4238@gmail.com';

/* ── HTML helpers ─────────────────────────────────────────────────────────── */
function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ── Guest thank-you email ────────────────────────────────────────────────── */
function guestHtml(name, attending, guests, note) {
  const yes = attending === 'yes';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:28px 0;background:#f3e0c8;font-family:Georgia,'Times New Roman',serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:0 16px">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#fdf6ee;border-radius:18px;overflow:hidden;box-shadow:0 16px 50px rgba(100,60,20,.2)">

  <tr><td style="background:linear-gradient(160deg,#5a1726 0%,#3a100f 100%);padding:44px 32px 32px;text-align:center">
    <div style="font-size:28px;color:#f6e2ad;margin-bottom:8px">&#65021;</div>
    <div style="font-size:32px;color:#f6e2ad;font-weight:normal;letter-spacing:.06em;margin-bottom:10px">Zarin &amp; Mahbub</div>
    <div style="font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#c9a46a">Thursday &middot; 16 July 2026 &middot; Faringdon Grove</div>
  </td></tr>

  <tr><td style="padding:36px 32px 10px">
    <p style="font-size:22px;color:#3a2010;margin:0 0 18px">Dear ${esc(name)},</p>
    ${yes ? `
    <p style="font-size:16px;line-height:1.85;color:#5a3820;font-style:italic;margin:0 0 22px">We are absolutely <strong style="font-style:normal">overjoyed</strong> that you'll be joining us on our special day! Your presence means the world to us, and we cannot wait to celebrate with you.</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf0e2;border:1px solid rgba(180,130,60,.2);border-radius:12px;margin:0 0 22px">
      <tr><td style="padding:18px 22px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#9a6420;padding:8px 0 8px;width:90px;border-bottom:1px solid rgba(180,130,60,.12)">Date</td>
              <td style="font-size:14px;color:#3a2010;font-weight:600;padding:8px 0 8px;border-bottom:1px solid rgba(180,130,60,.12)">Thursday, 16 July 2026</td></tr>
          <tr><td style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#9a6420;padding:8px 0 8px;border-bottom:1px solid rgba(180,130,60,.12)">Venue</td>
              <td style="font-size:14px;color:#3a2010;font-weight:600;padding:8px 0 8px;border-bottom:1px solid rgba(180,130,60,.12)">Faringdon Grove</td></tr>
          <tr><td style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#9a6420;padding:8px 0 ${note ? '8px' : '0'};${note ? 'border-bottom:1px solid rgba(180,130,60,.12)' : ''}">Guests</td>
              <td style="font-size:14px;color:#3a2010;font-weight:600;padding:8px 0 ${note ? '8px' : '0'};${note ? 'border-bottom:1px solid rgba(180,130,60,.12)' : ''}">${esc(guests)}</td></tr>
          ${note ? `<tr><td style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#9a6420;padding:8px 0 0;vertical-align:top">Message</td>
              <td style="font-size:14px;color:#3a2010;font-style:italic;padding:8px 0 0">&ldquo;${esc(note)}&rdquo;</td></tr>` : ''}
        </table>
      </td></tr>
    </table>

    <p style="font-size:16px;line-height:1.85;color:#5a3820;font-style:italic;margin:0">We'll be in touch closer to the day. If you have any questions, please don't hesitate to reach out.</p>
    ` : `
    <p style="font-size:16px;line-height:1.85;color:#5a3820;font-style:italic;margin:0 0 18px">Thank you so much for letting us know. While we'll truly miss having you with us, we completely understand, and we are grateful you took the time to respond.</p>
    <p style="font-size:16px;line-height:1.85;color:#5a3820;font-style:italic;margin:0">You'll be in our thoughts and prayers on our special day — your love and support mean everything to us.</p>
    `}
  </td></tr>

  <tr><td style="padding:28px 32px 36px;text-align:center;border-top:1px solid rgba(180,130,60,.15)">
    <div style="font-size:30px;color:#7a5018;margin:0 0 8px">Zarin &amp; Mahbub</div>
    <p style="font-size:13px;color:#8a6040;font-style:italic;line-height:1.65;margin:0">With love &amp; gratitude from both our families<br>16 &middot; 07 &middot; 2026</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

/* ── Couple notification email ────────────────────────────────────────────── */
function coupleHtml(name, email, attending, guests, note) {
  const yes = attending === 'yes';
  const headerBg = yes
    ? 'background:linear-gradient(160deg,#1a4a2a 0%,#0f2e18 100%)'
    : 'background:linear-gradient(160deg,#5a1726 0%,#3a100f 100%)';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:28px 0;background:#f3e0c8;font-family:Georgia,'Times New Roman',serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:0 16px">
<table width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;background:#fdf6ee;border-radius:16px;overflow:hidden;box-shadow:0 14px 44px rgba(100,60,20,.2)">

  <tr><td style="${headerBg};padding:28px;text-align:center">
    <div style="font-size:22px;color:#f6e2ad;font-weight:normal;letter-spacing:.04em">New RSVP &nbsp;${yes ? '&#10003;' : '&#10007;'}</div>
    <div style="display:inline-block;background:rgba(255,255,255,.18);color:#f6e2ad;padding:5px 16px;border-radius:30px;font-size:10px;letter-spacing:.24em;text-transform:uppercase;margin-top:10px">${yes ? 'Attending' : 'Not Attending'}</div>
  </td></tr>

  <tr><td style="padding:26px 28px 10px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr style="border-bottom:1px solid rgba(180,130,60,.12)">
        <td style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9a6420;padding:10px 0;width:80px">Name</td>
        <td style="font-size:15px;color:#3a2010;font-style:italic;padding:10px 0">${esc(name)}</td>
      </tr>
      <tr style="border-bottom:1px solid rgba(180,130,60,.12)">
        <td style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9a6420;padding:10px 0">Email</td>
        <td style="font-size:15px;padding:10px 0"><a href="mailto:${esc(email)}" style="color:#7a5018;text-decoration:none">${esc(email)}</a></td>
      </tr>
      <tr style="border-bottom:1px solid rgba(180,130,60,.12)">
        <td style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9a6420;padding:10px 0">Status</td>
        <td style="font-size:15px;font-weight:600;padding:10px 0;color:${yes ? '#1a5a2a' : '#7a1a1a'}">${yes ? 'Attending &#10003;' : 'Not Attending &#10007;'}</td>
      </tr>
      ${yes ? `<tr style="${note ? 'border-bottom:1px solid rgba(180,130,60,.12)' : ''}">
        <td style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9a6420;padding:10px 0">Guests</td>
        <td style="font-size:15px;color:#3a2010;font-style:italic;padding:10px 0">${esc(guests)}</td>
      </tr>` : ''}
      ${note ? `<tr>
        <td style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9a6420;padding:10px 0;vertical-align:top">Message</td>
        <td style="font-size:15px;color:#3a2010;font-style:italic;padding:10px 0">&ldquo;${esc(note)}&rdquo;</td>
      </tr>` : ''}
    </table>
  </td></tr>

  <tr><td style="padding:14px 28px 22px;text-align:center;border-top:1px solid rgba(180,130,60,.14)">
    <p style="font-size:12px;color:#8a6040;font-style:italic;margin:0">Received via your wedding invitation &middot; 16 &middot; 07 &middot; 2026</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

/* ── Main handler ─────────────────────────────────────────────────────────── */
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, attending, guests, note } = req.body || {};

  if (!name || !email)                              return res.status(400).json({ error: 'Name and email are required' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  return res.status(400).json({ error: 'Invalid email address' });

  const result = { success: true };

  /* ── 1. Store in Supabase ──────────────────────────────────────────────── */
  const sbUrl = process.env.SUPABASE_URL;
  const sbKey = process.env.SUPABASE_KEY;           // sb_secret_... (service role)
  const sbPub = process.env.SUPABASE_PUBLISHABLE_KEY; // sb_publishable_... (anon)
  if (sbUrl && sbKey) {
    try {
      const { createClient } = require('@supabase/supabase-js');
      // New Supabase key format: publishable key as apikey, secret key as bearer
      const clientKey = sbPub || sbKey;
      const sb = createClient(sbUrl, clientKey, {
        global: { headers: { Authorization: `Bearer ${sbKey}` } },
        auth: { persistSession: false }
      });
      const { error } = await sb
        .from('rsvps')
        .insert([{ name, email, attending: attending || 'yes', guests: guests || '1', note: note || '' }]);
      result.db = error ? 'error' : 'saved';
      if (error) console.error('[supabase]', error.message);
    } catch (e) {
      console.error('[supabase]', e.message);
      result.db = 'error';
    }
  }

  /* ── 2. Thank-you email to guest ──────────────────────────────────────── */
  try {
    const att = attending || 'yes';
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: att === 'yes'
        ? 'We cannot wait to celebrate with you! 🌹'
        : 'We’ll miss you — thank you for letting us know 💛',
      html: guestHtml(name, att, guests || '1', note || '')
    });
    result.guestEmail = 'sent';
  } catch (e) {
    console.error('[resend guest]', e.message);
    result.guestEmail = 'error';
  }

  /* ── 3. Notify couple ────────────────────────────────────────────────── */
  try {
    const att = attending || 'yes';
    await resend.emails.send({
      from: FROM,
      to: COUPLE,
      subject: `New RSVP — ${name} ${att === 'yes' ? 'will attend ✅' : 'cannot attend ❌'}`,
      html: coupleHtml(name, email, att, guests || '1', note || '')
    });
    result.coupleEmail = 'sent';
  } catch (e) {
    console.error('[resend couple]', e.message);
    result.coupleEmail = 'error';
  }

  return res.status(200).json(result);
};
