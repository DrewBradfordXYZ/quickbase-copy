import React, { useEffect, useState } from "react";
import { tableFields } from "../services/tableFields";
import { QuickBaseResponseGetFields } from "quickbase";

interface FetchTableFieldsProps {
  tableId: string;
}

const FetchTableFields: React.FC<FetchTableFieldsProps> = ({ tableId }) => {
  const [fields, setFields] = useState<QuickBaseResponseGetFields>([]);
  const [errorFields, setErrorFields] = useState<string | null>(null);

  useEffect(() => {
    const fetchTableFields = async () => {
      try {
        const results = await tableFields(tableId);
        setFields(results);
      } catch (err) {
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
      ) : fields.length > 0 ? (
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
