import { NhostClient } from "@nhost/nextjs";

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN as string,
  region: process.env.NEXT_PUBLIC_NHOST_REGION as string,
  adminSecret: process.env.NEXT_PUBLIC_NHOST_ADMIN_SECRET as string,
});

export { nhost };
