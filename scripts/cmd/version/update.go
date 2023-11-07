package version

import (
	"errors"

	"github.com/fatih/color"
	"github.com/kunalsin9h/secops/scripts/config"
	"github.com/spf13/cobra"
)

func updateVersion(cmd *cobra.Command, args []string) error {
	if len(args) == 0 {
		return errors.New("new version is missing\nProvide the new version to update the current version\n")
	}

	newVersion := args[0]

	packageJson, err := config.ReadConfigJson(config.PackageJsonFile)

	if err != nil {
		return err
	}

	packageJson["version"] = newVersion

	cargoToml, err := config.ReadconfigToml(config.CargoTomlFile)

	if err != nil {
		return err
	}

	cargoToml["package"].(map[string]any)["version"] = newVersion

	tauriConfJson, err := config.ReadConfigJson(config.TauriConfFile)

	if err != nil {
		return err
	}

	tauriConfJson["package"].(map[string]any)["version"] = newVersion

	color.HiWhite("UPDATING config file to version: v%s", newVersion)

	if err := config.WriteConfigJson(packageJson, config.PackageJsonFile); err != nil {
		return err
	}
	if err := config.WriteConfigJson(tauriConfJson, config.TauriConfFile); err != nil {
		return err
	}
	if err := config.WriteConfigToml(cargoToml, config.CargoTomlFile); err != nil {
		return err
	}

	color.HiGreen("Updated!")
	color.HiWhite("\tNow do.")
	color.HiCyan("\t\tpnpm update")
	color.HiCyan("\t\tcargo update (in src-tauri)")

	return nil

}

func versionUpdate() *cobra.Command {
	versionUpdateCmd := &cobra.Command{
		Use:   "update NEW_VERSION",
		Short: "update Secops version",
		Args:  cobra.ExactArgs(1),
		RunE:  updateVersion,
	}

	return versionUpdateCmd
}
