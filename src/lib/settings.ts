import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

type StateFile = {
  message: string;
  time: string;
  commands: Commands[];
};

type Commands = {
  name: string;
  run: string;
  undo: string;
};

const currentStateFilePath = ".secops/state/current.json";

async function readStatFile() {
  try {
    const currentStateFile = await readTextFile(currentStateFilePath, {
      dir: BaseDirectory.Home,
    });
    return currentStateFile;
  } catch (err) {
    throw new Error(err as string);
  }
}

/**
 * get a single setting value
 */
export async function getSetting(setting: string): Promise<boolean> {
  try {
    const stateFile = await readStatFile();
    const stateFileData = JSON.parse(stateFile) as StateFile;

    return stateFileData.commands.some((cmd) => {
      return cmd.name === setting;
    });
  } catch (err) {
    throw new Error(err as string);
  }
}
