const graphql = require("graphql");
const getData = require("./getData")

const characterType = new graphql.GraphQLObjectType({
    name: 'Character',
    fields: {
        id: {type: graphql.GraphQLString},
        name: {type: graphql.GraphQLString},
        status: {type: graphql.GraphQLString},
        species: {type: graphql.GraphQLString},
        gender: {type: graphql.GraphQLString},
        imageUrl: {type: graphql.GraphQLString},
        fullDescription: {
            type: graphql.GraphQLString,
            resolve: (source) => `${source.name}, ${source.status}`
        }
    }

});

const QueryRoot = new graphql.GraphQLObjectType({
    name: "Query",
    fields: () => ({
        helloDimension: {
            type: graphql.GraphQLString,
            resolve: () => "Hello Dimension!"
        },

        characters: {
            type: new graphql.GraphQLList(characterType),
            args: {
                ids: {type: graphql.GraphQLList(graphql.GraphQLInt)
            },
            resolve: async (parent, args, context) => {

                const chars = await getData.getCharacters(args.ids)

                return chars.map((char) => (
                    {
                        id: char.id,
                        name: char.name,
                        status: char.status,
                        species: char.species,
                        gender: char.gender,
                        fullDescription: char.fullDescription,
                        imageUrl: char.image,
                        locationUrl: char.location.url
                    }
                ))
            }
        }

    })
});

const schema = new graphql.GraphQLSchema({
    query: QueryRoot
});


module.exports = schema
