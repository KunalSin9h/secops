package version

import (
	"errors"
	"fmt"

	"github.com/fatih/color"
	"github.com/kunalsin9h/secops/scripts/config"
	"github.com/spf13/cobra"
)

func checkVersion(cmd *cobra.Command, args []string) error {
	packageJson, err := config.ReadConfigJson(config.PackageJsonFile)

	if err != nil {
		return err
	}

	packageJsonVersion := packageJson["version"]

	cargoToml, err := config.ReadconfigToml(config.CargoTomlFile)

	if err != nil {
		return err
	}

	cargoTomlVersion := cargoToml["package"].(map[string]any)["version"]

	tauriConfJson, err := config.ReadConfigJson(config.TauriConfFile)

	if err != nil {
		return err
	}

	tauriConfJsonVersion := tauriConfJson["package"].(map[string]any)["version"]

	if !(packageJsonVersion == cargoTomlVersion && cargoTomlVersion == tauriConfJsonVersion) {
		color.HiRed("Error:")
		fmt.Printf("package.json    -> %s\n", packageJsonVersion)
		fmt.Printf("Cargo.Toml      -> %s\n", cargoTomlVersion)
		fmt.Printf("tauri.conf.json -> %s\n", tauriConfJsonVersion)
		return errors.New("Version is inconsistent between package.json, Cargo.tom and tauri.conf.json")
	} else {
		color.HiYellow("Secops v%s", tauriConfJsonVersion)
	}

	return nil
}

// Command to check the application version
func Version() *cobra.Command {
	var versionCmd = &cobra.Command{
		Use:   "version",
		Short: "Get version App Desktop Version",
		RunE:  checkVersion,
	}

	versionCmd.AddCommand(versionUpdate())

	return versionCmd
}
