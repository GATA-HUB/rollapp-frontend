"use client";
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface DashboardState {
  activeIncentivizedCollections: any[];
  totalReward: number;
  totalBalance: number;
}

interface AppState {
  dashboard: DashboardState | null;
  mint: any;
  staked: any;
  assets: any;
  loading: {
    dashboard: boolean;
    mint: boolean;
    staked: boolean;
    assets: boolean;
  };
}

type Action =
  | { type: 'SET_DASHBOARD_DATA'; payload: DashboardState }
  | { type: 'SET_MINT_DATA'; payload: any }
  | { type: 'SET_STAKED_DATA'; payload: any }
  | { type: 'SET_ASSETS_DATA'; payload: any }
  | { type: 'SET_LOADING'; payload: { key: keyof AppState['loading']; value: boolean } }
  | { type: 'SET_TOTAL_REWARD'; payload: number };

const initialState: AppState = {
  dashboard: {
    activeIncentivizedCollections: [],
    totalReward: 0,
    totalBalance: 0,
  },
  mint: null,
  staked: null,
  assets: null,
  loading: {
    dashboard: false,
    mint: false,
    staked: false,
    assets: false,
  },
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_DASHBOARD_DATA':
      return { ...state, dashboard: action.payload };
    case 'SET_MINT_DATA':
      console.log('Setting mint data');
      console.log(action.payload);
      return { ...state, mint: action.payload };
    case 'SET_STAKED_DATA':
      return { ...state, staked: action.payload };
    case 'SET_ASSETS_DATA':
      return { ...state, assets: action.payload };
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.payload.key]: action.payload.value },
      };
    case 'SET_TOTAL_REWARD':
      return {
        ...state,
        dashboard: {
          ...state.dashboard!,
          totalReward: action.payload,
        },
      };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};