# Devdutt Sharma — Portfolio

A multi-page developer portfolio styled like a code editor: tab-bar navigation,
a terminal hero, and admin-only inline editing powered by Firebase.

## Files 

```
index.html            Home
about.html             Bio (blank, admin-editable)
projects.html          3 existing projects + admin can add more
future-projects.html   Roadmap of planned projects (admin-editable)
skills.html             Skill tags (admin-editable)
contact.html            Social + email links, GitHub included
login.html / signup.html   Firebase auth
style.css                Shared design system
firebase-init.js          Shared Firebase config + admin-check logic
firestore.rules            Security rules — copy into Firebase Console
```

## 1. Set up Firebase (one-time)

Your project (`zynexalpha`) already exists from your earlier files, so you're
mostly just updating the admin account and turning on Firestore.

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → open the **zynexalpha** project.
2. **Authentication → Users**
   - If `devdutts178@gmail.com` is listed, you can delete it or leave it — it no longer has admin rights.
   - Click **Add user**, enter `devdutt0817@gmail.com` and set a password. This is now the *only* account with edit access.
   - Click into that user → **Send email verification** (or use "Sign up" on your own site with that email, then verify via the email Firebase sends). The security rules require the email to be verified before it can write data — this stops someone from spoofing the address.
3. **Firestore Database**
   - If you haven't already, click **Create database** → start in production mode → pick a region close to you (e.g. `asia-south1` for India).
   - Go to the **Rules** tab, delete the default contents, and paste in everything from `firestore.rules` in this project. Click **Publish**.
4. **Authentication → Sign-in method** — make sure **Email/Password** is enabled.

That's it on the Firebase side. The `firebaseConfig` in `firebase-init.js` already matches your existing project, so no keys need to change.

## 2. How admin editing works

- Go to `login.html` and sign in with `devdutt0817@gmail.com`.
- Once logged in, every page unlocks: an "admin mode" badge appears, and buttons like **Edit bio**, **+ add project**, **+ add planned project**, and skill remove buttons (✕) show up.
- Everything you add/edit is saved to Firestore and is visible to *all* visitors as read-only content — only your account can change it.
- Log out from the footer link on any page.

## 3. Deploy it (pick one — both are free)

### Option A: GitHub Pages (recommended, ties in with your GitHub profile)

1. On [github.com/devdutt0817-glitch](https://github.com/devdutt0817-glitch), create a new repository — e.g. `portfolio` (or `devdutt0817-glitch.github.io` if you want it at the root of your GitHub Pages domain).
2. Upload all the files in this project to that repo (drag-and-drop on GitHub's web UI works, or use `git push` if you're comfortable with the CLI).
3. Go to the repo's **Settings → Pages**.
4. Under **Source**, choose the `main` branch and `/ (root)` folder → **Save**.
5. After a minute, GitHub gives you a live URL:
   - `https://devdutt0817-glitch.github.io/portfolio/` (if you named the repo `portfolio`), or
   - `https://devdutt0817-glitch.github.io/` (if the repo is named exactly `devdutt0817-glitch.github.io`)

### Option B: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com) → **Create a project**.
2. Either connect your GitHub repo (same one from Option A) for automatic deploys, or choose **Direct Upload** and drag in this folder.
3. Leave build settings blank (this is a static site, no build step needed).
4. Deploy — Cloudflare gives you a `*.pages.dev` URL immediately, and you can attach a custom domain later for free if you ever buy one.

Both options auto-redeploy if you connect them to GitHub and push new commits, so once it's set up, updating your site is just a `git push`.

## 4. A note on security

The Edit buttons only *appear* for the admin account, but the real protection
is the `firestore.rules` file — it blocks writes from anyone whose signed-in
email isn't `devdutt0817@gmail.com` with a verified email, at the database
level. Make sure you complete step 1.2/1.3 above (rules published, email
verified) before relying on it.
