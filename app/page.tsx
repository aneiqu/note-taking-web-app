import { middleware } from "@/app/middleware";

export default function app() {
  const session = middleware();
  return <div>Test</div>;
}
