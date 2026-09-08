# Supabase Storage Setup

The admin upload endpoint stores portfolio images and documents in Supabase Storage instead of the local `backend/uploads` folder.

1. Create a bucket named `portfolio-assets` in Supabase Storage.
2. Make the bucket public because portfolio images and resume photos are displayed publicly.
3. Add these variables to the backend deployment environment:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
SUPABASE_STORAGE_BUCKET=portfolio-assets
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` in the frontend or commit it to source control.

The existing frontend upload flow continues to work. The backend returns the Supabase public URL, which is saved in the same profile and project fields as before.

## Current upload workflow

- Uploads are held in memory by the backend and sent directly to the `portfolio-assets` bucket.
- The local `backend/uploads` folder is not used by the upload endpoint.
- Existing database values that reference `http://localhost:4000/uploads/...` must be re-uploaded through the admin dashboard.
- When replacing an image, remove the old object from the Supabase bucket after confirming it is no longer referenced.
- The service-role key must be configured in the deployed backend environment; do not use the publishable key for server uploads.