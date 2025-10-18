"use client";

import * as Tabs from "@radix-ui/react-tabs";

export default function RadixTest() {
  return (
    <Tabs.Root defaultValue="one">
      <Tabs.List>
        <Tabs.Trigger value="one">Tab One</Tabs.Trigger>
        <Tabs.Trigger value="two">Tab Two</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="one">✅ Radix UI is working!</Tabs.Content>
      <Tabs.Content value="two">🎉 Tabs are switching properly!</Tabs.Content>
    </Tabs.Root>
  );
}
