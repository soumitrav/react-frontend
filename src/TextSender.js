import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useSearchParams } from 'react-router-dom';


function TextSender() {
  const [inputText, setInputText] = useState('');
  const [initInputText, setInitInputText] = useState('Example: Enter the Prompt or JD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasInitialValue, setHasInitialValue] = useState(true);

  const [rowData, setRowData] = useState([
  ]);
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "age" },
    { field: "city" }
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);
      if(inputText == null || inputText == undefined || inputText == "") {
        return
      }
      // Replace with your API endpoint and fetch options
      const response = await fetch('/search/resume', {
        method: 'POST',
        body: JSON.stringify({ text: inputText }),
      });
      setInputText('');
      response.json().then((data) => {
				// Setting a data from api
				setRowData(data);
			})

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
    <div align="right">
      <h1>Welcome, {username}!</h1>
    </div>
    <form onSubmit={handleSubmit} align="center">
      {/*<label htmlFor="text-input">Enter Prompt to Search:</label> */}
      { /*<input
        type="text"
        id="text-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
        /> 
      */}

      <textarea 
        id="text-input"
        value={hasInitialValue && (inputText == null || inputText == undefined || inputText == "") ? initInputText : inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
        rows="5" cols="100" onFocus={() => setHasInitialValue(false)} onBlur={() => setHasInitialValue(true)}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>

    <div
   className="ag-theme-quartz" // applying the grid theme
   style={{ height: 500 }} // the grid will fill the size of the parent container
  >
    <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
    />
  </div>
  </div>
  );
}

export default TextSender;