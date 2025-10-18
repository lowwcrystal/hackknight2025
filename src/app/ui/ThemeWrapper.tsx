// src/components/ThemeWrapper.tsx
"use client";

import {Theme} from "@radix-ui/themes";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <Theme>{children}</Theme>;
}
