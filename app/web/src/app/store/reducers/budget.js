import { removeArrayItem as remove } from '../../utils/normalized';
import {
  FORM_BUDGET_BLOCK_ADD,
  FORM_BUDGET_BLOCK_REMOVE,
  FORM_BUDGET_FIELD_UPDATE,
  FORM_BUDGET_RESET,
} from '../../actions/budget';

const BudgetFormBlock = (id, type) => ({
  amount: {
    error: null,
    value: '0',
  },
  name: {
    error: null,
    value: '',
  },
  id,
  timeframe: {
    error: null,
    value: 'monthly',
  },
  type,
});

// could probably use a better way to normalize state shape:
// http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html
const defaultBudgetState = {
  forms: {
    byId : {
      expense: new BudgetFormBlock('expense', 'expense'),
      income: new BudgetFormBlock('income', 'income'),
      investment: new BudgetFormBlock('investment', 'investment'),
    },
    allIds : [
      'expense',
      'income',
      'investment',
    ],
  },
};

const getFormsWithRemovedBlock = (action, state) => {
  const { blockId } = action;
  const {
    [blockId]: id,
    ...byId
  } = state.forms.byId;

  return byId;
};

const budgetForm = (
  state = { ...defaultBudgetState },
  action,
) => {
  switch (action.type) {
    case FORM_BUDGET_FIELD_UPDATE:
      const {
        blockId,
        error,
        fieldName,
        value,
      } = action;

      const formBlock = state.forms.byId[blockId] || {};
      const updatedFormBlock = {
        ...formBlock,
      };

      updatedFormBlock[fieldName] = {
        error,
        value,
      };

      const forms = {
        allIds: (!state.forms.byId[blockId])
          ? [...state.forms.allIds, blockId]
          : [...state.forms.allIds],
        byId: {
          ...state.forms.byId,
          [blockId]: updatedFormBlock,
        },
      };

      return {
        ...state,
        forms,
      };
    case FORM_BUDGET_BLOCK_ADD:
      const now = Date.now();
      const newBlockId = `${action.blockType}_${now}`;
      const newBlock = new BudgetFormBlock(newBlockId, action.blockType);

      return {
        ...state,
        forms: {
          ...state.forms,
          allIds: [...state.forms.allIds, newBlockId],
          byId: {
            ...state.forms.byId,
            [newBlockId]: newBlock,
          },
        },
      };
    case FORM_BUDGET_BLOCK_REMOVE:
      const formsWithRemovedBlock = getFormsWithRemovedBlock(action, state);
      return {
        ...state,
        forms: {
          ...state.forms,
          allIds: remove(state.forms.allIds, action.blockId),
          byId: {
            ...formsWithRemovedBlock,
          },
        },
      };
    case FORM_BUDGET_RESET:
      return {
        ...defaultBudgetState,
      };
    default:
      return state;
  }
};

export default {
  budgetForm,
};
