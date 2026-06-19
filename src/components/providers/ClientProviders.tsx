"use client";

import dynamic from "next/dynamic";

const AmbientBackground = dynamic(
  () =>
    import("@/components/effects/AmbientBackground").then(
      (mod) => mod.AmbientBackground
    ),
  { ssr: false }
);

const CustomCursor = dynamic(
  () =>
    import("@/components/effects/CustomCursor").then((mod) => mod.CustomCursor),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () =>
    import("@/components/effects/ScrollProgress").then(
      (mod) => mod.ScrollProgress
    ),
  { ssr: false }
);

const MusicToggle = dynamic(
  () =>
    import("@/components/effects/MusicToggle").then((mod) => mod.MusicToggle),
  { ssr: false }
);

const SmoothScrollProvider = dynamic(
  () =>
    import("@/components/providers/SmoothScrollProvider").then(
      (mod) => mod.SmoothScrollProvider
    ),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AmbientBackground />
      <CustomCursor />
      <ScrollProgress />
      <MusicToggle />
      {children}
    </SmoothScrollProvider>
  );
}
