import { getResourceDetails } from './get-resource-details';
import { useResource } from './use-resource';

export default {
  Mutation: {
    useResource: useResource
  },
  Query: {
    resourceDetails: getResourceDetails
  }
};
