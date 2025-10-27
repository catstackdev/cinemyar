# 🚀 CINEMYAR Deployment Guide

## ✅ Recommended: Vercel (Auto-Deploy)

### Why Vercel?
- ✅ **Zero Config** - Detects Vite automatically
- ✅ **Auto Deploy** - Push to GitHub = instant deploy
- ✅ **Free HTTPS** - SSL certificate included
- ✅ **Global CDN** - Fast worldwide
- ✅ **No Maintenance** - No server to manage
- ✅ **Free Tier** - 100GB bandwidth/month

### Setup Steps (5 minutes)

1. **Push to GitHub** (Already done ✓)
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **"Add New Project"**
   - Select `catstackdev/cinemyar`
   - Settings auto-detected:
     - **Build Command**: `pnpm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `pnpm install`
   - Click **"Deploy"**

3. **Auto-Deploy Enabled!**
   ```bash
   git add .
   git commit -m "Update"
   git push origin main
   # Vercel automatically deploys! 🎉
   ```

4. **Custom Domain** (Optional)
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update DNS (A/CNAME records)
   - SSL auto-configured!

---

## 🖥️ Alternative: AWS Lightsail (Manual Control)

### Current Setup
- ✅ 1GB RAM instance
- ✅ Nginx configured
- ✅ Git post-receive hook
- ✅ Auto-build on push

### Deploy Command
```bash
git push lightsail main
```

### What Happens
1. Code pushed to `aws-server:~/apps/cinemyar`
2. Post-receive hook triggers
3. Code checked out to `/var/www/cinemyar`
4. `pnpm install` runs
5. `pnpm run build` runs
6. Files copied to `/var/www/html`
7. Nginx restarted
8. App live at http://54.151.192.61

### Enable HTTPS on Lightsail

**Requirements:**
- Domain name pointing to 54.151.192.61
- Port 443 open in Lightsail console

**Install SSL:**
```bash
ssh aws-server
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Auto-renewal configured automatically!

### Lightsail Firewall Setup
1. Go to Lightsail Console
2. Click your instance
3. **Networking** tab
4. **Add Rules**:
   - HTTP (80) - Already added
   - HTTPS (443) - Add this for SSL

### Server Commands
```bash
# View deployment logs (from local machine)
ssh aws-server 'journalctl -u nginx -f'

# Check nginx status
ssh aws-server 'sudo systemctl status nginx'

# Restart nginx
ssh aws-server 'sudo systemctl restart nginx'

# Check deployed files
ssh aws-server 'ls -la /var/www/html'

# View nginx error logs
ssh aws-server 'sudo tail -50 /var/log/nginx/error.log'

# Check server resources
ssh aws-server 'free -h && df -h'
```

---

## 📊 Comparison

| Feature | Vercel | Lightsail |
|---------|--------|-----------|
| **Setup Time** | 5 min | 30 min |
| **Auto Deploy** | ✅ Built-in | ✅ Via git hook |
| **HTTPS** | ✅ Auto | Manual (certbot) |
| **CDN** | ✅ Global | ❌ Single region |
| **Cost** | Free | $5/month |
| **Maintenance** | Zero | Server updates |
| **Custom Domain** | One click | DNS + SSL |
| **Build Time** | ~1 min | ~10 sec |
| **Backend Support** | Serverless only | Full control |

---

## 🎯 Current Project Status

### ✅ Completed
- [x] Enhanced CSS theme system
- [x] Comprehensive color palette (brand, gray, success, error, warning, orange, blue-light)
- [x] Professional shadow system
- [x] Enhanced typography scale
- [x] Custom utilities (scrollbar, animations)
- [x] Build optimized (68KB gzipped)
- [x] Git post-receive hook for Lightsail
- [x] Nginx configuration
- [x] Production build working

### 🎨 New Features Available

**Color System:**
- `brand-*` (25-950 scale)
- `gray-*` (25-950 scale)
- `success-*`, `error-*`, `warning-*`, `orange-*`, `blue-light-*`

**Typography:**
- `text-title-sm` through `text-title-2xl`
- `text-theme-xs`, `text-theme-sm`, `text-theme-xl`

**Shadows:**
- `shadow-theme-xs` through `shadow-theme-xl`
- `shadow-focus-ring`

**Utilities:**
- `no-scrollbar` - Hide scrollbars
- `custom-scrollbar` - Styled scrollbars

**Breakpoints:**
- `2xsm` (375px), `xsm` (425px), `3xl` (2000px)

---

## 🚀 Next Steps

### For Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Click deploy
4. Done! 🎉

### For Lightsail (Current)
1. Open port 80 in Lightsail console (if not working)
2. Get a domain name
3. Point domain to 54.151.192.61
4. Run certbot for HTTPS
5. Done! 🎉

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Lightsail Docs**: https://aws.amazon.com/lightsail/
- **Let's Encrypt**: https://letsencrypt.org/

---

**Recommendation**: Use **Vercel** for zero-maintenance auto-deployment with free HTTPS and CDN! 🚀
