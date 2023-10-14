import {
  readTextFile,
  BaseDirectory,
  readDir,
  writeTextFile,
} from "@tauri-apps/api/fs";

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

const stateFileDirectory = ".secops/state";
const currentStateFilePath = ".secops/state/current.json";

async function readStatFile(stateFile: string) {
  try {
    const currentStateFile = await readTextFile(stateFile, {
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
    const stateFile = await readStatFile(currentStateFilePath);
    const stateFileData = JSON.parse(stateFile) as StateFile;

    return stateFileData.commands.some((cmd) => {
      return cmd.name === setting;
    });
  } catch (err) {
    throw new Error(err as string);
  }
}

export type StateMeta = {
  message: string;
  time: string;
};

export type CommitStatus = {
  commit: boolean;
  states: StateMeta[];
};

/**
 * get all settings file content
 */
export async function getCommitStatus() {
  const allState: StateFile[] = [];
  // read the .secops/state directory
  const allStatesFile = await readDir(stateFileDirectory, {
    dir: BaseDirectory.Home,
  });

  for (const file of allStatesFile) {
    const stateFile = await readStatFile(`${stateFileDirectory}/${file.name}`);
    const stateFileData = JSON.parse(stateFile) as StateFile;
    allState.push(stateFileData);
  }

  // sort the state files in newest to oldest
  // newest will have bigger value then
  // older ones.
  allState.sort((a: StateFile, b: StateFile) => {
    const aTime = getValidDate(a.time).getTime();
    const bTime = getValidDate(b.time).getTime();

    return bTime - aTime;
  });

  // if user has done nothing that we won't allow commit
  let isAlreadyCommit = allState[0].commands.length === 0 ? true : false;

  if (allState.length > 1) {
    if (
      JSON.stringify(allState[0].commands) ===
      JSON.stringify(allState[1].commands)
    ) {
      isAlreadyCommit = true;
    } else {
      isAlreadyCommit = false;
    }
  }

  const res: CommitStatus = { commit: isAlreadyCommit, states: [] };

  for (const state of allState) {
    const time = getValidDate(state.time);
    res.states.push({
      message: state.message,
      time: `${time.toLocaleTimeString()}, ${time.toDateString()}`,
    });
  }

  return res;
}

/**
 * Assumption: Commit is only for current state file
 */
export async function commitSettings(message: string) {
  try {
    const stateFile = await readStatFile(currentStateFilePath);
    const stateFileData = JSON.parse(stateFile) as StateFile;

    const time = getValidDate(stateFileData.time);
    const newFileName = `${time.getTime()}_${message
      .split(" ")
      .join("_")}.json`;

    stateFileData.message = message;

    await writeTextFile(
      `${stateFileDirectory}/${newFileName}`,
      JSON.stringify(stateFileData, null, 4),
      {
        dir: BaseDirectory.Home,
      },
    );

    // TODO: may get time from rust
    stateFileData.time = `${new Date().toISOString()} +05:30`;

    stateFileData.message = "Current settings";

    await writeTextFile(
      currentStateFilePath,
      JSON.stringify(stateFileData, null, 4),
      { dir: BaseDirectory.Home },
    );
  } catch (err) {
    throw new Error(err as string);
  }
}

function getValidDate(currentDateString: string) {
  // The time from the state files are as : "2023-10-01 12:23:14.393575682 +05:30"
  // we only need part before +05:30
  const time = new Date(currentDateString.split(" +")[0]);

  return time;
}
