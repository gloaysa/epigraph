import { useState } from "react";
import { ActionIcon, Popover } from "@mantine/core";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type { Emoji } from "emoji-mart";

export const SelectableIcon = () => {
  const [opened, setOpened] = useState(false);
  const [emoji, setEmoji] = useState<string>("🌟");

  const handleSelect = (selection: Emoji | any) => {
    if (selection?.native) {
      console.log(selection.native);
      setEmoji(selection.native);
    }
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="bottom-start"
      withArrow
      shadow="sm"
    >
      <Popover.Target>
        <ActionIcon
          className="icon-picker__trigger"
          variant="subtle"
          radius="xl"
          size="xl"
          onClick={() => setOpened((o) => !o)}
        >
          <span className="icon-picker__emoji" style={{ fontSize: 18 }}>
            {emoji}
          </span>
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown className="icon-picker__dropdown">
        <Picker
          data={data}
          onEmojiSelect={handleSelect}
          theme="light"
          previewPosition="none"
          skinTonePosition="none"
        />
      </Popover.Dropdown>
    </Popover>
  );
};
