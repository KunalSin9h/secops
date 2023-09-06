package config

import (
	"encoding/json"
	"os"

	"github.com/pelletier/go-toml/v2"
)

const (
	PackageJsonFile = "package.json"
	CargoTomlFile   = "./src-tauri/Cargo.toml"
	TauriConfFile   = "./src-tauri/tauri.conf.json"
)

func ReadConfigJson(file string) (map[string]any, error) {
	fileData, err := os.ReadFile(file)

	if err != nil {
		return nil, err
	}

	var fileMap map[string]any

	if err := json.Unmarshal(fileData, &fileMap); err != nil {
		return nil, err
	}

	return fileMap, nil
}

func ReadconfigToml(file string) (map[string]any, error) {
	fileData, err := os.ReadFile(file)

	if err != nil {
		return nil, err
	}

	var fileMap map[string]any

	if err := toml.Unmarshal(fileData, &fileMap); err != nil {
		return nil, err
	}

	return fileMap, nil
}

func WriteConfigJson(data map[string]any, file string) error {
	dataBinary, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return err
	}

	if err := os.WriteFile(file, dataBinary, os.ModePerm); err != nil {
		return err
	}

	return nil
}

func WriteConfigToml(data map[string]any, file string) error {
	dataBinary, err := toml.Marshal(data)
	if err != nil {
		return err
	}

	if err := os.WriteFile(file, dataBinary, os.ModePerm); err != nil {
		return err
	}

	return nil
}
