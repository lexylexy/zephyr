import { Message } from "eris";
import { Zephyr } from "../client/Zephyr";
import { GameProfile } from "../game/Profile";

export interface PrefabItem {
  id: number;
  names: string[];
  useCost?: number;
  requiredArguments?: number;
  confirmation?: boolean;
  description?: string;
  usage?: string;
  emoji: string;
  soulbound?: boolean;
  use?: (
    msg: Message,
    profile: GameProfile,
    parameters: string[],
    zephyr: Zephyr
  ) => Promise<void>;
}
