import { Message } from "eris";
import { MessageEmbed } from "../../structures/client/RichEmbed";
import { BaseCommand } from "../../structures/command/Command";
import fs from "fs/promises";

export default class CheckCardImages extends BaseCommand {
  names = ["cci"];
  description = `Scans card images for errors.`;
  developerOnly = true;

  async exec(msg: Message): Promise<void> {
    const images = this.zephyr.getCards().map((c) => c.image);

    const failed = [];
    for (let i of images) {
      try {
        await fs.readFile(i);
      } catch {
        failed.push(i);
      }
    }

    const embed = new MessageEmbed().setAuthor(
      `Check Card Images | ${msg.author.tag}`,
      msg.author.dynamicAvatarURL("png")
    );
    if (failed.length === 0) {
      embed.setDescription(`:ok_hand: All files were scanned successfully.`);
    } else {
      console.log(failed);
      embed.setDescription(
        `**${failed.length}** file${
          failed.length === 1 ? `` : `s`
        } failed. See console for further information.`
      );
    }

    await this.send(msg.channel, embed);
    return;
  }
}
