import {useCallback, useState} from 'react';

interface LoginHandlerPropsType {
  authenticateUser: any;
  navigation: any;
}

const useLoginHandlers = ({
  authenticateUser,
  navigation,
}: LoginHandlerPropsType) => {
  const [credential, setCredential] = useState<{
    userName: string;
    password: string;
  }>({
    userName: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalidCredentials, setInvalidCredentials] = useState(false);

  const onUserNameChange = useCallback(
    (text: string) =>
      setCredential({
        ...credential,
        userName: text,
      }),
    [credential, setCredential],
  );

  const onPasswordChange = useCallback(
    (text: string) =>
      setCredential({
        ...credential,
        password: text,
      }),
    [credential, setCredential],
  );

  const onReset = useCallback(
    () => setCredential({userName: '', password: ''}),
    [setCredential],
  );

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = useCallback(async () => {
    if (!credential.userName || !credential.password) {
      setInvalidCredentials(true);
      return;
    }

    const result = await authenticateUser(credential);

    if (result.error) {
      setInvalidCredentials(true);
      onReset();
    } else {
      navigation.navigate('Home Page');
    }
  }, [
    authenticateUser,
    credential,
    navigation,
    onReset,
    setInvalidCredentials,
  ]);

  const onSignUp = useCallback(
    () => navigation.navigate('SignUpPage1'),
    [navigation],
  );

  return {
    credential,
    showPassword,
    isInvalidCredentials,
    setInvalidCredentials,
    toggleShowPassword,
    onUserNameChange,
    onPasswordChange,
    onSubmit,
    onSignUp,
  };
};

export default useLoginHandlers;
