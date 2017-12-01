import { getNumberError } from '../utils';
export const FORM_BUDGET_BLOCK_ADD = 'FORM_BUDGET_BLOCK_ADD';
export const FORM_BUDGET_BLOCK_REMOVE = 'FORM_BUDGET_BLOCK_REMOVE';
export const FORM_BUDGET_FIELD_UPDATE = 'FORM_BUDGET_FIELD_UPDATE';
export const FORM_BUDGET_RESET = 'FORM_BUDGET_RESET';

// budget form
export const updateBudgetField = ({
  fieldName,
  blockId,
  value,
}) => {
  let error = null;

  if (fieldName === 'amount') {
    error = getNumberError(value);
  }

  return {
    type: FORM_BUDGET_FIELD_UPDATE,
    blockId,
    error: (!error)
      ? null
      : error,
    fieldName,
    value,
  };
};

export const addBudgetBlock = blockType => ({
  type: FORM_BUDGET_BLOCK_ADD,
  blockType,
});

export const removeBudgetBlock = blockId => ({
  type: FORM_BUDGET_BLOCK_REMOVE,
  blockId,
});
