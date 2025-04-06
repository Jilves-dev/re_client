// Updated DebugComponent
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '@/config';

const DebugComponent = () => {
  const [debug, setDebug] = useState({
    apiUrl: API || 'Not set',
    axiosBaseUrl: axios.defaults.baseURL || 'Not set',
    serverTest: 'Not tested',
    apiTest: 'Not tested',
    adsTest: 'Not tested',
    anotherTest: 'Not tested',
    directTest: 'Not tested'
  });

  useEffect(() => {
    // Set axios default again, just to be safe
    axios.defaults.baseURL = API;
    setDebug(prev => ({ ...prev, axiosBaseUrl: axios.defaults.baseURL || 'Still not set' }));

    const testConnections = async () => {
      // Test server base URL
      try {
        const serverBaseUrl = API.replace('/api', '');
        console.log("Testing server base URL:", serverBaseUrl);
        const serverTest = await axios.get(serverBaseUrl);
        setDebug(prev => ({ ...prev, serverTest: `Success: ${JSON.stringify(serverTest.data)}` }));
      } catch (error) {
        console.error("Server test failed:", error);
        setDebug(prev => ({ ...prev, serverTest: `Error: ${error.message}` }));
      }

      // Test API base
      try {
        console.log("Testing API base:", API);
        const apiTest = await axios.get(API);
        setDebug(prev => ({ ...prev, apiTest: `Success: ${JSON.stringify(apiTest.data)}` }));
      } catch (error) {
        console.error("API test failed:", error);
        setDebug(prev => ({ ...prev, apiTest: `Error: ${error.message}` }));
      }

      // Test ads endpoint
      try {
        console.log("Testing ads endpoint:", `${API}/ads`);
        const adsTest = await axios.get(`${API}/ads`);
        setDebug(prev => ({ ...prev, adsTest: `Success: ${JSON.stringify(adsTest.data)}` }));
      } catch (error) {
        console.error("Ads test failed:", error);
        setDebug(prev => ({ ...prev, adsTest: `Error: ${error.message}` }));
      }

      // Test with additional configuration
      try {
        console.log("Testing with explicit config");
        const anotherTest = await axios.get(`${API}/test`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        setDebug(prev => ({ ...prev, anotherTest: `Success: ${JSON.stringify(anotherTest.data)}` }));
      } catch (error) {
        console.error("Another test failed:", error);
        setDebug(prev => ({ ...prev, anotherTest: `Error: ${error.message}` }));
      }

      // Direct test without axios
      try {
        console.log("Testing with fetch API");
        const response = await fetch(`${API}/test`);
        const data = await response.json();
        setDebug(prev => ({ ...prev, directTest: `Success: ${JSON.stringify(data)}` }));
      } catch (error) {
        console.error("Direct test failed:", error);
        setDebug(prev => ({ ...prev, directTest: `Error: ${error.message}` }));
      }
    };

    testConnections();
  }, []);

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
      <h2>Enhanced API Debug Information</h2>
      <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#eee', padding: '10px' }}>
        {JSON.stringify({
          apiUrl: debug.apiUrl,
          axiosBaseUrl: debug.axiosBaseUrl
        }, null, 2)}
      </pre>
      <h3>Connection Tests:</h3>
      <ul>
        <li><strong>Server Base URL Test:</strong> {debug.serverTest}</li>
        <li><strong>API Base Test:</strong> {debug.apiTest}</li>
        <li><strong>Ads Endpoint Test:</strong> {debug.adsTest}</li>
        <li><strong>Test with Headers:</strong> {debug.anotherTest}</li>
        <li><strong>Direct Fetch Test:</strong> {debug.directTest}</li>
      </ul>
    </div>
  );
};

export default DebugComponent;