import {useCallback} from 'react';

interface LoginHandlerPropsType {
  authenticateUser: any;
  credential: any;
  setInvalidCredentials: any;
  setCredential: any;
  navigation: any;
}

const useLoginHandlers = ({
  authenticateUser,
  credential,
  setInvalidCredentials,
  setCredential,
  navigation,
}: LoginHandlerPropsType) => {
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

  const onSubmit = useCallback(async () => {
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
    () => navigation.navigate('Sign Up'),
    [navigation],
  );

  return {onUserNameChange, onPasswordChange, onSubmit, onSignUp};
};

export default useLoginHandlers;
