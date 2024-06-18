// src/utils/loadCsv.ts
import Papa from 'papaparse';
import { SetDataCallback } from '../atoms/atom';

export const loadCsvData = (url: string, setDataCallback: SetDataCallback): void => {
  fetch(url)
    .then((response) => response.text())
    .then((csvData) => {
      Papa.parse(csvData, {
        header: true,
        complete: (results) => {
          setDataCallback(results.data as []);
        },
      });
    })
    .catch((error) => console.error('Error loading CSV data:', error));
};
