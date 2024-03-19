import {gql, useMutation} from '@apollo/client';

const GENERATE_PHONE_OTP = gql`
  mutation generatePhoneOTP($otpInput: OTPInput!) {
    generatePhoneOTP(otpInput: $otpInput) {
      success
      verificationToken
      phoneNumber {
        countryCode
        phoneNumber
      }
    }
  }
`;

const useGeneratePhoneOTP = () => {
  const [generatePhoneOTP, {loading}] = useMutation(GENERATE_PHONE_OTP);

  return {
    generatePhoneOTP: async (input: any) => {
      try {
        const {data} = await generatePhoneOTP({variables: input});
        return data.generatePhoneOTP;
      } catch (err) {
        console.error('Error generating phone OTP:', err);
      }
    },
    loading
  };
};

export default useGeneratePhoneOTP;
