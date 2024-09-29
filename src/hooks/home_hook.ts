import { useState, useEffect  } from 'react';
import { ComparisonResult } from '@/entities/comparison_result';
import { parseConfig } from '@/parsers/config_parser';

export const useHomeHook = () => {
    const [config1, setConfig1] = useState('');
    const [config2, setConfig2] = useState('');
    const [compareType, setCompareType] = useState('all');
    const [config1Type, setConfig1Type] = useState('.env');
    const [config2Type, setConfig2Type] = useState('.env');
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult[]>([]);
    const [differentValuesResult, setDifferentValuesResult] = useState<ComparisonResult[]>([]);
    const [searchTermCompareKeys, setSearchTermCompareKeys] = useState('');
    const [searchCategoryCompareKeys, setSearchCategoryCompareKeys] = useState('All');
    const [searchTermCompareValues, setSearchTermCompareValues] = useState('');
    const [searchCategoryCompareValues, setSearchCategoryCompareValues] = useState('All');

    const handleCompare = () => {
      const parsedConfig1 =  parseConfig(config1Type, config1);
      const parsedConfig2 =  parseConfig(config2Type, config2);
      const allKeys = new Set([...Object.keys(parsedConfig1), ...Object.keys(parsedConfig2)]);
      const result: ComparisonResult[] = Array.from(allKeys).map((key) => {
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

    return {
        config1, setConfig1,
        config2, setConfig2,
        compareType, setCompareType,
        config1Type, setConfig1Type,
        config2Type, setConfig2Type,
        comparisonResult, setComparisonResult,
        differentValuesResult, setDifferentValuesResult,
        searchTermCompareKeys, setSearchTermCompareKeys,
        searchCategoryCompareKeys, setSearchCategoryCompareKeys,
        searchTermCompareValues, setSearchTermCompareValues,
        searchCategoryCompareValues, setSearchCategoryCompareValues,
        handleCompare,
    }
}