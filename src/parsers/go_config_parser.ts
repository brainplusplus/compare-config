
export const parseGoConfig = (envString: string): { [key: string]: string } => {
    
    const regex = /\b\w+\.(?:Get(?:String|Bool|Int|Duration|Int64|Int32|Float64|IntSlice|SizeInBytes|StringMap|StringMapString|StringSlice|StringMapStringSlice|Time|Uint|Uint16|Uint32|Uint64)|Getenv)\("([^"]+)"\)/g;

    const resultMap: Record<string, string> = {};
    let match;

    // Extract all matches
    while ((match = regex.exec(envString)) !== null) {
        const key = match[1];
        resultMap[key] = '';
    }

    return resultMap;
}