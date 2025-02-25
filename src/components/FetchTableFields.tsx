import React, { useEffect, useState } from "react";
import { getFields } from "../services/getFields";
import { QuickBaseResponseGetFields } from "quickbase";

interface FetchTableFieldsProps {
  tableId: string;
}

const FetchTableFields: React.FC<FetchTableFieldsProps> = ({ tableId }) => {
  const [fields, setFields] = useState<QuickBaseResponseGetFields | null>(null);
  const [errorFields, setErrorFields] = useState<string | null>(null);

  useEffect(() => {
    const fetchTableFields = async () => {
      try {
        const results = await getFields(tableId);
        if (Array.isArray(results)) {
          setFields(results);
        } else {
          console.error("No data found in results:", results);
          setErrorFields("Failed to fetch table fields");
        }
      } catch (err) {
        console.error("Error fetching fields:", err);
        setErrorFields("Failed to fetch table fields");
      }
    };

    fetchTableFields();
  }, [tableId]);

  return (
    <div>
      <h1>QuickBase Table Fields</h1>
      <p>Table ID: {tableId}</p>
      {errorFields ? (
        <p>{errorFields}</p>
      ) : fields ? (
        <ul>
          {fields.map((field) => (
            <li key={field.id}>{field.label}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FetchTableFields;
