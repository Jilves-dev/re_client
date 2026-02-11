// src/components/DebugComponent.jsx - Enhanced version
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API, validateApiConnection } from '@/config';
import { useAuth } from '@/context/auth';

const DebugComponent = () => {
  const [auth] = useAuth();
  const [debug, setDebug] = useState({
    apiUrl: API || 'Not set',
    axiosBaseUrl: axios.defaults.baseURL || 'Not set',
    authToken: auth?.token ? `${auth.token.substring(0, 10)}...` : 'No token',
    apiStatus: 'Testing...',
    serverStatus: 'Testing...',
    adsStatus: 'Testing...',
    tokenStatus: 'Testing...',
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const testConnections = async () => {
      try {
        // Validate API connection first
        const apiValidation = await validateApiConnection();
        setDebug((prev) => ({
          ...prev,
          apiStatus: apiValidation.success
            ? `Success: ${apiValidation.message}`
            : `Error: ${apiValidation.message}`,
        }));

        // Test server base URL
        try {
          const serverBaseUrl = API.replace('/api', '');
          const serverTest = await axios.get(serverBaseUrl);
          setDebug((prev) => ({
            ...prev,
            serverStatus: `Success: ${JSON.stringify(serverTest.data)}`,
          }));
        } catch (error) {
          setDebug((prev) => ({
            ...prev,
            serverStatus: `Error: ${error.message}`,
          }));
        }

        // Test ads endpoint
        try {
          const adsTest = await axios.get(`${API}/ads`);
          setDebug((prev) => ({
            ...prev,
            adsStatus: `Success: ${adsTest.data?.adsForSell?.length || 0} sell ads, ${adsTest.data?.adsForRent?.length || 0} rent ads`,
          }));
        } catch (error) {
          setDebug((prev) => ({
            ...prev,
            adsStatus: `Error: ${error.message}`,
          }));
        }

        // Test auth token if available
        if (auth?.token) {
          try {
            const tokenTest = await axios.get(`${API}/current-user`);
            setDebug((prev) => ({
              ...prev,
              tokenStatus: `Success: User ${tokenTest.data?.username || tokenTest.data?.email || 'authenticated'}`,
            }));
          } catch (error) {
            setDebug((prev) => ({
              ...prev,
              tokenStatus: `Error: ${error.message} (${error.response?.status || 'unknown status'})`,
            }));
          }
        } else {
          setDebug((prev) => ({
            ...prev,
            tokenStatus: 'Not tested - no token available',
          }));
        }
      } catch (err) {
        console.error('Debug tests failed:', err);
      }
    };

    testConnections();
  }, [auth?.token]);

  // Update auth token display when auth changes
  useEffect(() => {
    setDebug((prev) => ({
      ...prev,
      authToken: auth?.token ? `${auth.token.substring(0, 10)}...` : 'No token',
    }));
  }, [auth?.token]);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div
      style={{
        margin: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={toggleExpanded}
      >
        <h3 style={{ margin: 0 }}>API Connection Status</h3>
        <span>{expanded ? '▼' : '▶'}</span>
      </div>

      {expanded && (
        <>
          <div style={{ marginTop: '10px' }}>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                backgroundColor: '#eee',
                padding: '10px',
                borderRadius: '4px',
              }}
            >
              {JSON.stringify(
                {
                  environment: import.meta.env.MODE,
                  apiUrl: debug.apiUrl,
                  axiosBaseUrl: debug.axiosBaseUrl,
                  authToken: debug.authToken,
                },
                null,
                2
              )}
            </pre>
          </div>

          <h4>Connection Tests:</h4>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li
              style={{
                padding: '8px',
                margin: '4px 0',
                backgroundColor: debug.apiStatus.includes('Success')
                  ? '#e6ffec'
                  : '#ffebe6',
                borderRadius: '4px',
              }}
            >
              <strong>API Base Test:</strong> {debug.apiStatus}
            </li>
            <li
              style={{
                padding: '8px',
                margin: '4px 0',
                backgroundColor: debug.serverStatus.includes('Success')
                  ? '#e6ffec'
                  : '#ffebe6',
                borderRadius: '4px',
              }}
            >
              <strong>Server Test:</strong> {debug.serverStatus}
            </li>
            <li
              style={{
                padding: '8px',
                margin: '4px 0',
                backgroundColor: debug.adsStatus.includes('Success')
                  ? '#e6ffec'
                  : '#ffebe6',
                borderRadius: '4px',
              }}
            >
              <strong>Ads Endpoint Test:</strong> {debug.adsStatus}
            </li>
            <li
              style={{
                padding: '8px',
                margin: '4px 0',
                backgroundColor: debug.tokenStatus.includes('Success')
                  ? '#e6ffec'
                  : '#ffebe6',
                borderRadius: '4px',
              }}
            >
              <strong>Auth Token Test:</strong> {debug.tokenStatus}
            </li>
          </ul>

          <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
            Environment: {import.meta.env.MODE} | Last updated:{' '}
            {new Date().toLocaleTimeString()}
          </p>
        </>
      )}
    </div>
  );
};

export default DebugComponent;
