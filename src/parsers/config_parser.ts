import { parseEnv } from "@/parsers/env_parser";
import { parseGoConfig } from "@/parsers/go_config_parser";
import { parseYAML, parseYAMLBase64Value } from "@/parsers/yaml_parser"; 

export const parseConfig = (configType: string, envString: string) => {
    switch(configType){
        case ".yaml": return parseYAML(envString);
        case ".yaml-base64-value": return parseYAMLBase64Value(envString);
        case "config.go": return parseGoConfig(envString);
        default: return parseEnv(envString);
    }
};