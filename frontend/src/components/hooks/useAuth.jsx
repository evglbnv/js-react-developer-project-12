import {
  useContext,
} from 'react';

import { AuthContext } from '../../contexts/AuthContext';

const useAuth = () => useContext(AuthContext);
console.log(AuthContext)

export default useAuth;