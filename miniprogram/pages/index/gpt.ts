import { useWebsocket } from "../../lib/websocket";
import type { Message } from "./conversation";

export async function useGPT(conversation: Message[]) {
  const { send, handleMessage, handleClose } = await useWebsocket(
    conversation.map((msg) => msg.slice(0, 2))
  );
  return { send, handleMessage, handleClose};
}
