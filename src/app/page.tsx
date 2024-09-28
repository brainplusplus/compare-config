// pages/index.js
"use client"
import { useState, useEffect  } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import dotenv from 'dotenv';
import YAML from 'yaml'
import * as yaml from 'js-yaml';


  const parseEnv = (configString: string) => {
    return dotenv.parse(configString);
  };

  const parseYAML = (configString: string) => {
    return flattenObject(yaml.load(configString));
  };

  function flattenObject(obj: any, prefix = ''): Record<string, any> {
    let flattened: Record<string, any> = {};
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          Object.assign(flattened, flattenObject(obj[key], newKey));
        } else {
          flattened[newKey] = obj[key];
        }
      }
    }
  
    return flattened;
  }

  interface ComparisonResult {
    key: string;
    config1Value: string;
    config2Value: string;
    description: string;
  }
  
  export default function Home() {
    const [config1, setConfig1] = useState('');
    const [config2, setConfig2] = useState('');
    const [compareType, setCompareType] = useState('all');
    const [config1Type, setConfig1Type] = useState('.env');
    const [config2Type, setConfig2Type] = useState('.env');
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult[]>([]);
    const [differentValuesResult, setDifferentValuesResult] = useState<ComparisonResult[]>([]);

    const parseEnv = (envString: string) => {
      return dotenv.parse(envString);
    };
    const handleCompare = () => {
      const parsedConfig1 = config1Type === '.env' ? parseEnv(config1) : config1Type === '.yaml' ? parseYAML(config1) : {};
      const parsedConfig2 = config2Type === '.env' ? parseEnv(config2) : config2Type === '.yaml' ? parseYAML(config2) : {};
      console.log(parsedConfig1)
      const allKeys = new Set([...Object.keys(parsedConfig1), ...Object.keys(parsedConfig2)]);
      console.log(allKeys)
      const result: ComparisonResult[] = Array.from(allKeys).map((key) => {
        console.log(key)
        const config1Value = parsedConfig1[key] || '-';
        const config2Value = parsedConfig2[key] || '-';
        let description = '';
  
        if (config1Value === '-') {
          description = `Config 1 missing ${key}`;
        } else if (config2Value === '-') {
          description = `Config 2 missing ${key}`;
        }
        const valConfig1: string = Array.isArray(config1Value) ? JSON.stringify(config1Value) : config1Value;
        const valConfig2: string = Array.isArray(config2Value) ? JSON.stringify(config2Value) : config2Value;

        return {
          key,
          config1Value: valConfig1,
          config2Value: valConfig2,
          description,
        };
      });
  
      const filteredResult = result.filter(({ config1Value, config2Value }) => {
        if (compareType === 'config1') {
          return config1Value === '-';
        } else if (compareType === 'config2') {
          return config2Value === '-';
        }
        return true; // 'all'
      });
  
      setComparisonResult(filteredResult);
  
      const differentValues = Array.from(allKeys).map((key) => {
        const config1Value = parsedConfig1[key] || '-';
        const config2Value = parsedConfig2[key] || '-';
        let description = '';
  
        if (config1Value !== '-' && config2Value !== '-' && config1Value !== config2Value) {
          description = 'Different Value';
        }
  
        const valConfig1: string = Array.isArray(config1Value) ? JSON.stringify(config1Value) : config1Value;
        const valConfig2: string = Array.isArray(config2Value) ? JSON.stringify(config2Value) : config2Value;

        return {
          key,
          config1Value: valConfig1,
          config2Value: valConfig2,
          description,
        };
      }).filter(({ description }) => description !== '');
  
      setDifferentValuesResult(differentValues);
    };

    useEffect(() => {
      handleCompare();
    }, [compareType]);

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="flex justify-between w-3/4 mb-10">
        <div className="flex flex-col w-2/5">
          <label className="font-bold mb-2">Config 1</label>
          <Select onValueChange={(val) => setConfig1Type(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={config1Type || 'Select'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=".env" >
                .env
              </SelectItem><SelectItem value=".yaml">
                .yaml
              </SelectItem>
              <SelectItem value="config.go">
                config.go
              </SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            className="p-2 border rounded mt-2"
            placeholder="Type here"
            value={config1}
            onChange={(e) => setConfig1(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-2/5">
          <label className="font-bold mb-2">Config 2</label>
          <Select onValueChange={(val) => setConfig2Type(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={config2Type || 'Select'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=".env">
                .env
              </SelectItem>
              <SelectItem value=".yaml">
                .yaml
              </SelectItem>
              <SelectItem value="config.go">
                config.go
              </SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            className="p-2 border rounded mt-2"
            placeholder="Type here"
            value={config2}
            onChange={(e) => setConfig2(e.target.value)}
          />
        </div>
      </div>
      <Button className="p-2 mb-10 bg-blue-500 text-white rounded" onClick={handleCompare}>
        Compare
      </Button>
      <Tabs defaultValue="keys" className="w-3/4">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger value="keys" className="p-2 border rounded mr-2">
            Compare Keys
          </TabsTrigger>
          <TabsTrigger value="values" className="p-2 border rounded">
            Compare Value
          </TabsTrigger>
        </TabsList>
        <TabsContent value="keys" className="border p-4 rounded">
          <div className="mb-4">
            <input
              type="radio"
              name="compareType"
              value="all"
              checked={compareType === 'all'}
              onChange={() => setCompareType('all')}
              className="mr-2"
            />{' '}
            Show All
            <input
              type="radio"
              name="compareType"
              value="config1"
              checked={compareType === 'config1'}
              onChange={() => setCompareType('config1')}
              className="ml-4 mr-2"
            />{' '}
            Only Config 1
            <input
              type="radio"
              name="compareType"
              value="config2"
              checked={compareType === 'config2'}
              onChange={() => setCompareType('config2')}
              className="ml-4 mr-2"
            />{' '}
            Only Config 2
          </div>
          <table className="table-fixed w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border p-2">Key</th>
                <th className="border p-2">Config 1</th>
                <th className="border p-2">Config 2</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResult.map(({ key, config1Value, config2Value, description }) => (
                <tr key={key}>
                  <td className="border p-2 break-all">{key}</td>
                  <td className="border p-2 break-all">{config1Value}</td>
                  <td className="border p-2 break-all">{config2Value}</td>
                  <td className="border p-2 break-all">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="values" className="border p-4 rounded">
          <table className="table-fixed w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border p-2">Key</th>
                <th className="border p-2">Config 1</th>
                <th className="border p-2">Config 2</th>
                <th className="border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {differentValuesResult.map(({ key, config1Value, config2Value, description }) => (
                <tr key={key}>
                  <td className="border p-2 break-all">{key}</td>
                  <td className="border p-2 break-all">{config1Value}</td>
                  <td className="border p-2 break-all">{config2Value}</td>
                  <td className="border p-2 break-all">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}