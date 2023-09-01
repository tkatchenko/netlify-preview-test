import { graphql } from 'gatsby';
import React from 'react';
import { PortableText } from '@portabletext/react';

export default function Page({ data }) {
  console.log(data);
  return (
    <>
      <h1>{data.page.title}</h1>
      <PortableText
        value={data.page._rawContent}
      />
    </>
  );
}

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    page: sanityPage(slug: { current: { eq: $slug } }) {
      id
      title
      _rawContent(resolveReferences: { maxDepth: 10 })
    }
  }
`;
