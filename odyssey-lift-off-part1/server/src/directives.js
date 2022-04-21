const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');

// https://www.graphql-tools.com/docs/schema-directives
// https://www.apollographql.com/docs/apollo-server/schema/creating-directives

const upperDirectiveTransformer = (schema, directiveName) => {
  const typeDirectiveArgumentMaps = {};
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        // console.log('field config', fieldConfig);
        fieldConfig.resolve = async (source, args, context, info) => {
          const newSource = { ...source, prepend: upperDirective['prepend'] };
          const result = await resolve(newSource, args, context, info);
          console.log('result', result);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    },

    [MapperKind.TYPE]: (type) => {
      const upperDirective = getDirective(schema, type, directiveName)?.[0];
      console.log('upper type directive', upperDirective);
      if (upperDirective) {
        console.log('type', type);
        typeDirectiveArgumentMaps[type.name] = upperDirective;
      }
      return undefined;
    },

    [MapperKind.OBJECT_TYPE]: (typeConfig) => {
      const upperDirective = getDirective(
        schema,
        typeConfig,
        directiveName
      )?.[0];
      if (upperDirective) {
        const { resolve = defaultFieldResolver } = typeConfig;
        console.log('object type upperDirective', upperDirective);
        console.log('typeconfig', typeConfig);
        typeConfig.resolve = async (source, args, context, info) => {
          const newSource = { ...source, prepend: upperDirective['prepend'] };
          const result = await resolve(newSource, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return typeConfig;
      }
    },
  });
};

module.exports = upperDirectiveTransformer;
