"use client"; // required because it uses Radix client components
import {Button, Flex, Text} from "@radix-ui/themes";

export default function MyApp() {
  return (
    <Flex direction="column" gap="2" className="mb-8">
      <Text>Hello from Radix Themes :)</Text>
        <Button>Let&#39;s go</Button>
    </Flex>
  );
}
