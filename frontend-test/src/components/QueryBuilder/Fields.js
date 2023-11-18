import { defaultOperators } from 'react-querybuilder'
import { dmaNames } from './DmaNames';
import { dmaID } from './DmaId';

export const validator = (r) => !!r.value

export const fields = [
  {
    name: 'dma_name',
    label: 'DMA',
    valueEditorType: 'select',
    values: dmaNames,
    defaultValue: '-',
    operators: defaultOperators.filter((op) => op.name === '='),
  },

  {
    name: 'dma_id',
    label: 'DMA Identification',
    valueEditorType: 'select',
    values: dmaID,
    defaultValue: '-',
    validator
  },

  { 
    name: 'rank', 
    label: 'Rank', 
    inputType: 'number', 
    validator 
  },

  {
    name: 'term',
    label: 'Term',
    placeholder: 'Enter the term to search',
    defaultOperator: 'beginsWith',
    validator
  },

  {
    name: 'week',
    label: 'Week when the term was search',
    inputType: 'date'
  },

  {
    name: 'refresh_date',
    label: 'Date when the data get updated',
    inputType: 'date'
  }
];
