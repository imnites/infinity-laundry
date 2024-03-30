import React from 'react';
import {WebView} from 'react-native-webview';
import useTemplateDetails from '~/hooks/useTemplateDetails';

export const AdContent: React.FC = () => {
  const {loading, templateDetails} = useTemplateDetails('ad-content');
  if (loading) {
    return;
  }

  return (
    <WebView
      source={{html: templateDetails.html, baseUrl: ''}}
      injectedJavaScript={templateDetails.css + templateDetails.javascript}
    />
  );
};

export default AdContent;
