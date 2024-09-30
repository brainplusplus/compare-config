const config1_env = 
`APP_HOST=localhost
APP_NAME=Compare Config
APP_PORT=5000
DB_NAME=test
`

const config2_env = 
`APP_NAME=Compare Config
APP_PORT=3000
DB_NAME=test3
DB_HOST=127.0.0.1
`

const config1_properties = 
`database.url=jdbc:postgresql:/localhost:5432/instance
database.username=foo
database.password=bar
`

const config2_properties = 
`database.url=jdbc:mysql:/localhost:3306/instance
database.database=foo
database.username=bar
`

const config1_yaml = 
`services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
`

const config2_yaml = 
`services:
  web:
    build: ./app
    ports:
      - "8100:5000"
  mysql:
    image: "mysql:alpine"
`

const config1_b64_yaml = 
`services:
  web:
    build: Lg==
    ports:
      - LiI4MDAwOjUwMDAi
  redis:
    image: InJlZGlzOmFscGluZSI=
`

const config2_b64_yaml = 
`services:
  web:
    build: Li9hcHA=
    ports:
      - IjgxMDA6NTAwMCI=
  mysql:
    image: Im15c3FsOmFscGluZSI=
`

const config1_go = 
`package main

import (
	"os"
	"time"
    "fmt"
	"github.com/spf13/viper"
)

type Config struct {
	App AppConfig
}

type AppConfig struct {
	Name            string
	Version         string
	Port            int
	GracefulTimeout time.Duration
	IsMaintenance   bool
}

func main() {
	config := viper.New()

	config.AddConfigPath("./../")
	config.SetConfigFile(".env")
	config.AutomaticEnv()

	_ = config.ReadInConfig()
	
	name := config.GetString("APP_NAME")
    version := os.Getenv("APP_VERSION")
    port := config.GetInt("APP_PORT")
	gracefulTimeout := config.GetDuration("APP_GRACEFUL_TIMEOUT")
    isMaintenance := config.GetBool("APP_IS_MAINTENANCE")

    fmt.Println("name:",name," | version: ",version," | port: ",port," | gracefulTimeout: ",gracefulTimeout," | isMaintenance: ",isMaintenance)
}
`

const config2_go = 
`package main

import (
	"os"
	"github.com/spf13/viper"
)

type Config struct {
	App AppConfig
}

type AppConfig struct {
	Name            string
	Version         string
	Port            int
	IsDebug         bool
}

func LoadConfig() (Config, error) {
	conf := viper.New()

	conf.AddConfigPath("./")
	conf.SetConfigFile(".env")
	conf.AutomaticEnv()

	_ = conf.ReadInConfig()
	
	return Config{
		App: AppConfig{
			Name:            os.GetString("APP_NAME"),
			Version:         conf.Getenv("APP_VERSION"),
			Port:            conf.GetInt("APP_PORT"),
			IsDebug:         conf.GetBool("APP_IS_DEBUG"),
		},
	}, nil
}
`

const sampleDataMap = new Map<string, string>();
sampleDataMap.set('config1.env', config1_env)
sampleDataMap.set('config2.env', config2_env)
sampleDataMap.set('config1.properties', config1_properties)
sampleDataMap.set('config2.properties', config2_properties)
sampleDataMap.set('config1.yaml', config1_yaml)
sampleDataMap.set('config2.yaml', config2_yaml)
sampleDataMap.set('config1_b64.yaml', config1_b64_yaml)
sampleDataMap.set('config2_b64.yaml', config2_b64_yaml)
sampleDataMap.set('config1.go', config1_go)
sampleDataMap.set('config2.go', config2_go)

export default sampleDataMap;
