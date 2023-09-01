import React from 'react';
import Preview from './parts/preview';

const url = 'https://example.com';

export const structure = (S, context) =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Pages')
                .schemaType('page')
                .child(
                  S.documentTypeList('page')
                    .title('Pages')
                    .child((documentId) =>
                      S.document()
                        .schemaType('page')
                        .id(documentId)
                        .views([
                          S.view.form(),
                          S.view
                            .component(Preview)
                            .options({ url: `${url}/page/` })
                            .title('Preview')
                        ])
                    )
                ),
            ])
        ),
    ]);
