import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

type StateFile = {
  message: string;
  time: string;
  settings: Settings;
  commands: [];
};

type Settings = {
  [setting: string]: string | boolean | Settings | Settings[] | undefined;
};

/**
 * get a single setting value
 *
 * @param setting string
 */
export default async function getSetting(setting: string) {
  const currentStateFilePath = ".secops/state/current.json";

  try {
    const currentStateFile = await readTextFile(currentStateFilePath, {
      dir: BaseDirectory.Home,
    });

    const stateFileData = JSON.parse(currentStateFile) as StateFile;

    return stateFileData.settings[setting];
  } catch (err) {
    throw new Error(err as string);
  }
}
