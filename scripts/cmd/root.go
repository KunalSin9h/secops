package cmd

import (
	"fmt"
	"os"

	"github.com/fatih/color"
	"github.com/kunalsin9h/secops/scripts/cmd/version"
	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(version.VersionCmd)
}

var rootCmd = &cobra.Command{
	Use:   "secops",
	Short: "Utility scripts for developing Secops Desktop",
	Long:  "scripts such as checking version, updating version etc.",

	Run: func(cmd *cobra.Command, args []string) {
		color.HiCyan("SECOPS DESKTOP")
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
