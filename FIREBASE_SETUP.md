# Lumex Admin — Firebase Setup

Paste these into your **lumex-domain** Firebase project.

## 1. Firestore — Required Collections

Create these collections (Firestore auto-creates on first write, but list here for reference):

| Collection            | Purpose                                                |
| --------------------- | ------------------------------------------------------ |
| `messages`            | Public contact-form submissions (client → LUMEX Admin) |
| `mail`                | Internal mail folder / saved replies for the admin     |
| `businesses`          | Websites we have built / manage                        |
| `software`            | Software products we sell / built                      |
| `apps`                | Mobile apps we sell / built                            |
| `offers`              | Active promos shown on the homepage `OffersStrip`      |
| `settings`            | Site, SEO, branding, contact configuration documents   |
| `vacancies`           | Open jobs posted by admin, shown on /careers           |
| `careerApplications`  | Career applications from /careers (also copied to messages) |
| `notificationTokens`  | FCM device tokens for push to admin                    |

### Example `offers` document
```json
{
  "title": "Free Domain with Any Website",
  "description": "Get a free .co.ke domain when you order any website package.",
  "status": "active",
  "expiresAt": "2026-12-31",
  "createdAt": <serverTimestamp>
}
```

### Example `messages` document
```json
{
  "name": "Jane Doe",
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+254700000000",
  "subject": "Website Design",
  "service": "Website Design",
  "message": "I want a portfolio site...",
  "status": "new",
  "source": "contact-page",
  "channel": "LUMEX Messages",
  "pageUrl": "https://your-site/contact",
  "userAgent": "browser user agent string",
  "createdAt": <serverTimestamp>
}
```

Use `messages` for the website form. Do not use the old `contactMessages` collection.

---

## 2. Firestore Security Rules

Open **Firebase Console → Firestore → Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    function isOwner() {
      return request.auth != null
        && request.auth.uid == "NlOhkCy1W3ZtdjikVfzcMc9jrH73";
    }

    // PUBLIC: anyone (signed-in or anonymous) can CREATE a contact message.
    // Only the owner can read / update / delete. No client write to admin-only collections.
    match /messages/{id} {
      allow create: if
        request.resource.data.name is string
        && request.resource.data.email is string
        && request.resource.data.phone is string
        && request.resource.data.message is string
        && request.resource.data.name.size() >= 2  && request.resource.data.name.size() <= 200
        && request.resource.data.email.size() >= 5 && request.resource.data.email.size() <= 200
        && request.resource.data.phone.size() >= 5 && request.resource.data.phone.size() <= 50
        && request.resource.data.message.size() >= 2 && request.resource.data.message.size() < 5000
        && request.resource.data.status == "new"
        && request.resource.data.source in ["contact-page", "talk-to-us"];
      allow read, update, delete: if isOwner();
    }

    // Public can read ACTIVE offers only (for homepage strip).
    match /offers/{id} {
      allow read: if resource.data.status == "active";
      allow write: if isOwner();
    }

    // Public can read public business / software / app catalog.
    match /businesses/{id} { allow read: if true; allow write: if isOwner(); }
    match /software/{id}   { allow read: if true; allow write: if isOwner(); }
    match /apps/{id}       { allow read: if true; allow write: if isOwner(); }
    match /vacancies/{id}  { allow read: if true; allow write: if isOwner(); }

    // PUBLIC: anyone can submit a career application; only owner reads.
    match /careerApplications/{id} {
      allow create: if request.resource.data.name is string
        && request.resource.data.name.size() >= 2 && request.resource.data.name.size() <= 200
        && request.resource.data.email is string && request.resource.data.email.size() <= 200
        && request.resource.data.status == "new";
      allow read, update, delete: if isOwner();
    }

    // Public can read site settings (used for SEO/contact display).
    match /settings/{id} { allow read: if true; allow write: if isOwner(); }

    // Owner-only.
    match /mail/{id}              { allow read, write: if isOwner(); }
    match /notificationTokens/{id}{ allow read, write: if isOwner(); }

    // Default deny.
    match /{path=**} { allow read, write: if isOwner(); }
  }
}
```

---

## 3. Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    function isOwner() {
      return request.auth != null
        && request.auth.uid == "NlOhkCy1W3ZtdjikVfzcMc9jrH73";
    }
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if isOwner();
    }
    match /{allPaths=**} { allow read, write: if isOwner(); }
  }
}
```

---

## 4. Cloud Messaging (push notifications)

In Firebase Console → Project Settings → Cloud Messaging → Web Push certificates:
1. Click **Generate key pair**.
2. Copy the **VAPID key**.
3. Paste it into `src/lib/firebase-admin.ts` → `FCM_VAPID_KEY`.
