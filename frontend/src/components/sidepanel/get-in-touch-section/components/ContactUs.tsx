import React from 'react';
import {WebView} from 'react-native-webview';
import useTemplateDetails from '~/hooks/useTemplateDetails';

export const ContactUs: React.FC = () => {
  const {loading, templateDetails} = useTemplateDetails('contact-us');
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

export default ContactUs;
