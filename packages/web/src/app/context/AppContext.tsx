"use client";
import React, {createContext, ReactNode, useContext, useEffect, useReducer} from 'react';
import {fetchDashboardData} from '../utils/contracts';

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

export function AppWrapper({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!state.dashboard) {
          dispatch({
            type: "SET_LOADING",
            payload: { key: "dashboard", value: true },
          });
        }
        const dashboardData = await fetchDashboardData();
        dispatch({
          type: "SET_DASHBOARD_DATA",
          payload: dashboardData,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        if (!state.dashboard) {
          dispatch({
            type: "SET_LOADING",
            payload: { key: "dashboard", value: false },
          });
        }
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 60000); // Fetch every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}