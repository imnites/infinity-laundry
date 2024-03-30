import { TemplateDetails } from '~/generated-types';
import { Template } from '~/models';
import { Context } from '~/types';

const mapToTemplateDetails = (
  template: Template | null
): TemplateDetails | null => {
  if (template !== null)
    return {
      id: template.Id,
      slug: template.Slug,
      name: template.Name,
      status: template.Status as boolean,
      html: template.HTML,
      css: template.CSS,
      javascript: template.Javascript
    };

  return null;
};

export const getTemplateDetails = async (
  parent: { [key: string]: unknown } | null,
  args: {
    input: {
      slug: string;
    };
  },
  context: Context
): Promise<TemplateDetails | null> => {
  const template =
    await context.serviceClients.templateService.getTemplateDetails(
      args.input.slug
    );

  return mapToTemplateDetails(template);
};
