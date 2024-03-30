import {useQuery, gql} from '@apollo/client';

const GET_TEMPLATE_DETAILS = gql`
  query GetTemplateDetails($input: TemplateDetailsInput!) {
    templateDetails(input: $input) {
      id
      slug
      name
      status
      html
      css
      javascript
    }
  }
`;

const useTemplateDetails = (slug: String) => {
  const {loading, data} = useQuery(GET_TEMPLATE_DETAILS, {
    variables: {
      input: {
        slug
      }
    }
  });

  const injectedCSS = `
    const style = document.createElement('style');
    style.textContent = ${JSON.stringify(data?.templateDetails?.css)};
    document.head.appendChild(style);
  `;

  return {
    loading,
    templateDetails: {
      html: data?.templateDetails?.html,
      css: injectedCSS,
      javascript: data?.templateDetails?.javascript
    }
  };
};

export default useTemplateDetails;
