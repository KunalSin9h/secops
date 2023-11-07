package cmd

import (
	"github.com/fatih/color"
	"github.com/kunalsin9h/secops/scripts/cmd/version"
	"github.com/spf13/cobra"
)

// func init() {
// 	RootCmd.AddCommand(version.VersionCmd)
// }

func NewCLI() *cobra.Command {
	var rootCmd = &cobra.Command{
		Use:   "secops",
		Short: "Utility scripts for developing Secops Desktop",
		Long:  "scripts such as checking version, updating version etc.",

		Run: func(cmd *cobra.Command, args []string) {
			color.HiCyan("SECOPS DESKTOP")
		},
	}

	rootCmd.AddCommand(version.Version())

	return rootCmd
}
