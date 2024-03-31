import React from 'react';
import {WebView} from 'react-native-webview';
import useTemplateDetails from '~/hooks/useTemplateDetails';

export const TermsAndConditions: React.FC = () => {
  const {loading, templateDetails} = useTemplateDetails('terms-and-conditions');
  if (loading) {
    return;
  }

  return (
    <WebView
      source={{html: templateDetails.html, baseUrl: ''}}
      injectedJavaScript={templateDetails.css}
    />
  );
};

export default TermsAndConditions;
