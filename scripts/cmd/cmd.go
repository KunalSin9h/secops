package cmd

import (
	"fmt"

	"github.com/fatih/color"
	"github.com/kunalsin9h/secops/scripts/cmd/version"
	"github.com/spf13/cobra"
)

func NewCLI() *cobra.Command {
	var rootCmd = &cobra.Command{
		Use:   "secops",
		Short: "Utility scripts for developing Secops Desktop Application",
		Long:  "scripts such as checking version, updating version etc.",

		Run: func(cmd *cobra.Command, args []string) {
			color.HiCyan("SECOPS DESKTOP")
			fmt.Println(cmd.UsageString())
		},
	}

	rootCmd.AddCommand(version.Version())

	return rootCmd
}
