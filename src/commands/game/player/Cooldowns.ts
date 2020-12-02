import dayjs from "dayjs";
import { Message } from "eris";
import { getTimeUntil } from "../../../lib/ZephyrUtils";
import { MessageEmbed } from "../../../structures/client/RichEmbed";
import { BaseCommand } from "../../../structures/command/Command";
import { GameProfile } from "../../../structures/game/Profile";
export default class Cooldowns extends BaseCommand {
  names = ["cooldowns", "cd", "timer", "timers", "t"];
  description = "Shows the status of various timers.";

  async exec(msg: Message, profile: GameProfile): Promise<void> {
    const prefix = this.zephyr.getPrefix(msg.guildID);

    const now = dayjs(Date.now());
    const embed = new MessageEmbed()
      .setAuthor(
        `Cooldowns | ${msg.author.tag}`,
        msg.author.dynamicAvatarURL("png")
      )
      .setTitle(`${msg.author.tag}'s Cooldowns`)
      .setDescription(`\`${prefix}daily\` **Daily Reward**: __${getTimeUntil(
      now,
      dayjs(Date.now()).add(1, "day").startOf("day") || "Now"
    )}__\n\` ${prefix}drop\` **Drop**: __${
      getTimeUntil(now, dayjs(profile.dropNext)) || "Now"
    }__\n\`<none>\` **Claim**: __${
      getTimeUntil(now, dayjs(profile.claimNext)) || "Now"
    }__
    `);
    await msg.channel.createMessage({ embed });
  }
}
