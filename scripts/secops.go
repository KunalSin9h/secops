package main

import (
	"context"

	"github.com/kunalsin9h/secops/scripts/cmd"
	"github.com/spf13/cobra"
)

func main() {
	cobra.CheckErr(cmd.NewCLI().ExecuteContext(context.Background()))
}
