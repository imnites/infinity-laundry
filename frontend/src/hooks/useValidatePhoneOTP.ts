import {gql, useMutation} from '@apollo/client';
import {setTokenValue} from '~/utils/token-utils';

const VALIDATE_PHONE_OTP = gql`
  mutation validatePhoneOTP($verificationToken: String!, $otp: String!) {
    validatePhoneOTP(verificationToken: $verificationToken, otp: $otp) {
      accessToken
      userId
      verified
      tokenType
    }
  }
`;

const useValidatePhoneOTP = () => {
  const [validatePhoneOTP, {loading}] = useMutation(VALIDATE_PHONE_OTP, {
    onCompleted: async ({
      validatePhoneOTP: {verified, accessToken, tokenType}
    }) => {
      if (verified) {
        await setTokenValue({accessToken, tokenType});
      }
    }
  });

  return {
    validatePhoneOTP: async (input: any) => {
      try {
        const {data} = await validatePhoneOTP({variables: input});
        return data.validatePhoneOTP;
      } catch (err) {
        console.error('Error generating phone OTP:', err);
      }
    },
    loading
  };
};

export default useValidatePhoneOTP;
