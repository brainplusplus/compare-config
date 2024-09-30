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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { filterComparisonResultList } from '@/lib/utils';
import { useHomeHook } from '@/hooks/home_hook';
import sampleDataMap from '@/mocks/config_mock';

export default function Home() {
    const {
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
        loadSampleData,
        loadFromFile,
        handleCompare,
    } = useHomeHook();

    const filteredDifferentKeysResult = filterComparisonResultList(comparisonResult, searchTermCompareKeys, searchCategoryCompareKeys);
    const filteredDifferentValuesResult = filterComparisonResultList(differentValuesResult, searchTermCompareValues, searchCategoryCompareValues);

    useEffect(() => {
      handleCompare();
    }, [compareType]);

  return (
    <div>
        <h1 className="text-3xl font-bold mb-4 text-center">Compare Configuration File</h1>
        <div className="flex flex-col items-center mt-10">
        <div className="flex justify-between w-3/4 mb-10">
            <div className="flex flex-col w-2/5">
            <label className="font-bold mb-2">Config 1</label>
            <Select onValueChange={(val) => setConfig1Type(val)}>
                <SelectTrigger className="full-w">
                    <SelectValue placeholder={config1Type || 'Select'} />
                </SelectTrigger>
                <SelectContent className="full-w">
                    <SelectItem value=".env" >
                        .env
                    </SelectItem>
                    <SelectItem value=".properties" >
                        .properties
                    </SelectItem>
                    <SelectItem value=".yaml">
                        .yaml
                    </SelectItem>
                    <SelectItem value=".yaml-base64-value">
                        .yaml-base64-value
                    </SelectItem>
                    <SelectItem value="config.go">
                        config in .go file
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={() => loadSampleData(sampleDataMap,"1",config1Type, setConfig1)} >
                Load Sample Data
            </Button>
            <Input
                placeholder="Upload File"
                type="file"
                accept=".yaml, .env, .go, .properties"
                onChange={(event) => loadFromFile(event, setConfig1)} />
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
                <SelectTrigger className="full-w">
                    <SelectValue placeholder={config2Type || 'Select'} />
                </SelectTrigger>
                <SelectContent className="full-w">
                    <SelectItem value=".env">
                        .env
                    </SelectItem>
                    <SelectItem value=".properties" >
                        .properties
                    </SelectItem>
                    <SelectItem value=".yaml">
                        .yaml
                    </SelectItem>
                    <SelectItem value=".yaml-base64-value">
                        .yaml-base64-value
                    </SelectItem>
                    <SelectItem value="config.go">
                        config in .go file
                    </SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={() => loadSampleData(sampleDataMap,"2",config2Type, setConfig2)} >
                Load Sample Data
            </Button>
            <Input
                placeholder="Upload File"
                type="file"
                accept=".yaml, .env, .go, .properties"
                onChange={(event) => loadFromFile(event, setConfig2)} />
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
            
            <div className="p-4">
                    <div className="flex mb-4">
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
                    <div className="flex mb-4">
                        <Select onValueChange={(val) => setSearchCategoryCompareKeys(val)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={searchCategoryCompareKeys || 'Select'} />
                            </SelectTrigger>
                            <SelectContent className="pr-4">
                                <SelectItem value="All">
                                    All
                                </SelectItem>
                                <SelectItem value="Key">
                                    Key
                                </SelectItem>
                                <SelectItem value="Config1Value">
                                    Config1 Value
                                </SelectItem>
                                <SelectItem value="Config2Value">
                                    Config2 Value
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="text"
                            className="pl-4 p-2 border border-gray-300 rounded w-full"
                            placeholder="Search..."
                            value={searchTermCompareKeys}
                            onChange={(e) => setSearchTermCompareKeys(e.target.value)}
                            />
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
                        {filteredDifferentKeysResult.map(({ key, config1Value, config2Value, description }) => (
                            <tr key={key}>
                            <td className="border p-2 break-all">{key}</td>
                            <td className="border p-2 break-all">{config1Value}</td>
                            <td className="border p-2 break-all">{config2Value}</td>
                            <td className="border p-2 break-all">{description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
            </TabsContent>
            <TabsContent value="values" className="border p-4 rounded">
                <div className="p-4">
                    <div className="flex mb-4">
                        <Select onValueChange={(val) => setSearchCategoryCompareValues(val)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={searchCategoryCompareValues || 'Select'} />
                            </SelectTrigger>
                            <SelectContent className="pr-4">
                                <SelectItem value="All">
                                    All
                                </SelectItem>
                                <SelectItem value="Key">
                                    Key
                                </SelectItem>
                                <SelectItem value="Config1Value">
                                    Config1 Value
                                </SelectItem>
                                <SelectItem value="Config2Value">
                                    Config2 Value
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="text"
                            className="pl-4 p-2 border border-gray-300 rounded w-full"
                            placeholder="Search..."
                            value={searchTermCompareValues}
                            onChange={(e) => setSearchTermCompareValues(e.target.value)}
                            />
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
                        {filteredDifferentValuesResult.map(({ key, config1Value, config2Value, description }) => (
                            <tr key={key}>
                            <td className="border p-2 break-all">{key}</td>
                            <td className="border p-2 break-all">{config1Value}</td>
                            <td className="border p-2 break-all">{config2Value}</td>
                            <td className="border p-2 break-all">{description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </TabsContent>
        </Tabs>
        </div>
    </div>
  );
}