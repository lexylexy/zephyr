import { Message } from "eris";
import { MessageEmbed } from "../../structures/client/RichEmbed";
import { GameProfile } from "../../structures/game/Profile";
import { PrefabItem } from "../../structures/item/PrefabItem";
import { ProfileService } from "../database/services/game/ProfileService";
import { createMessage } from "../discord/message/createMessage";
import { getItemById } from "../../assets/Items";
import * as ZephyrError from "../../structures/error/ZephyrError";
import { Stickers } from "../cosmetics/Stickers";
import { Zephyr } from "../../structures/client/Zephyr";

export async function useStickerPack(
  msg: Message,
  profile: GameProfile,
  packItem: PrefabItem
): Promise<void> {
  const targetPack = Stickers.getStickerPackByItemId(packItem.id);

  if (!targetPack) throw new ZephyrError.NoPackBoundToItemError();

  const selectedSticker = Zephyr.chance.weighted(
    targetPack.stickers,
    targetPack.stickers.map((s) => s.rarity)
  );

  const stickerItem = getItemById(selectedSticker.itemId);

  if (!stickerItem) throw new ZephyrError.NoStickerItemError();

  await ProfileService.removeItems(profile, [{ item: packItem, count: 1 }]);
  await ProfileService.addItems(profile, [{ item: stickerItem, count: 1 }]);

  const embed = new MessageEmbed(`Sticker Pack`, msg.author).setDescription(
    `🎉 You opened the **${targetPack.name}** and received...\n\n1x __**${selectedSticker.name}**__!`
  );

  await createMessage(msg.channel, embed);
  return;
}