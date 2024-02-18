import {
  useContext,
} from 'react';

import { AuthContext, BackendApiContext } from '../../contexts/AuthContext';

const useAuth = () => useContext(AuthContext);
const useBackendApi = () => useContext(BackendApiContext)


export { useAuth, useBackendApi };