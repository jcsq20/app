import { APIModels } from 'src/shared/api';
import { SignInView } from './views';

export interface AuthModuleProps {
  onSignIn: (user: APIModels.IAuthUserDTO) => unknown;
}

const AuthModule: React.FC<AuthModuleProps> = ({ onSignIn }) => (
  <SignInView onSignIn={onSignIn} />
);

export default AuthModule;
