import { createContext } from 'react';
import { PermissionsState } from './PermissionsProvider';

interface ContextProps {
    permissions: PermissionsState;
    askLocationPermission: () => Promise<void>;
    checkLocationPermission: () => Promise<void>;
}

export const PermissionsContext = createContext( {} as ContextProps );