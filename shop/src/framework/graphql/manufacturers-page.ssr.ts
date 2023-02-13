import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { addApolloState, initializeApollo } from './client';
import { MANUFACTURERS_PER_PAGE } from './client/variables';
import { GroupsDocument } from './gql/groups.graphql';
import { ManufacturersDocument } from './gql/manufacturers.graphql';
import { SettingsDocument } from './gql/settings.graphql';
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: SettingsDocument,
    variables: {
      language: locale
    }
  });
  await apolloClient.query({
    query: GroupsDocument,
    variables: {
      language: locale
    }
  });
  await apolloClient.query({
    query: ManufacturersDocument,
    variables: {
      first: MANUFACTURERS_PER_PAGE,
      language: locale
    },
  });
  return addApolloState(apolloClient, {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  });
};
