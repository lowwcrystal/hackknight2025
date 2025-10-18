"use client"; // required because it uses Radix client components
import MyRadixApp from "../components/MyApp"; //adjust path as needed
import { Flex, Text, Button } from "@radix-ui/themes";

export default function MyApp() {
  return (
    <Flex direction="column" gap="2" className="mb-8">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
  );
}
