import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";

type StateFile = {
  message: string;
  time: string;
  settings: Settings;
  commands: Commands[];
};

type Settings = {
  [setting: string]: SettingsValue;
};

type SettingsValue =
  | undefined
  | boolean
  | number
  | string
  | SettingsValue[]
  | Settings;

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
export async function getSetting(setting: string): Promise<SettingsValue> {
  try {
    const stateFile = await readStatFile();
    const stateFileData = JSON.parse(stateFile) as StateFile;

    return stateFileData.settings[setting];
  } catch (err) {
    throw new Error(err as string);
  }
}

/**
 * Update a single setting value
 */
export async function updateSetting(setting: string, value: SettingsValue) {
  try {
    const stateFile = await readStatFile();
    const stateFileData = JSON.parse(stateFile) as StateFile;

    stateFileData.settings[setting] = value;

    const newData = JSON.stringify(stateFileData, null, "\t");
    await writeTextFile(currentStateFilePath, newData, {
      dir: BaseDirectory.Home,
    });
  } catch (err) {
    throw new Error(err as string);
  }
}
