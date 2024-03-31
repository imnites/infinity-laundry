const typeDefs = `
  extend type Query {
    templateDetails(input: TemplateDetailsInput!): TemplateDetails!
  }

  input TemplateDetailsInput {
    slug: String!
  }

  type TemplateDetails {
    id: String!
    slug: String!
    name: String!
    status: Boolean!
    html: String!
    css: String!
    javascript: String!
  }
`;

export default typeDefs;
