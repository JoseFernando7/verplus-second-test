import React, { useState } from 'react';
import { QueryBuilder, formatQuery } from 'react-querybuilder';
import { fields } from './Fields';
import 'react-querybuilder/dist/query-builder.css';
import './styles.css';

const initialQuery = { combinator: 'and', rules: [] };

function QueryBuilderService () {
  const [query, setQuery] = useState(initialQuery)

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  }

  const showQuery = () =>{
    const sql = formatQuery(query, 'sql')
    console.log(sql)
  }

  return (
    <>
      <QueryBuilder fields={fields} query={query} onQueryChange={handleQueryChange} />
      <h4>
        SQL as result of <code> formatQuery(query, 'sql') </code>
      </h4>
      <pre> { formatQuery(query, 'sql') } </pre>
      <button onClick={showQuery}> Save query </button>
    </>
  );
};

export default QueryBuilderService
