import S from '@sanity/desk-tool/structure-builder';
import EyeIcon from 'part:@sanity/base/eye-icon';
import EditIcon from 'part:@sanity/base/edit-icon';
import LinkIcon from 'part:@sanity/base/link-icon';
import React from 'react';
import Preview from './parts/preview';

const url = 'https://example.com';

export default () =>
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
                          S.view.form().icon(EditIcon),
                          S.view
                            .component(Preview)
                            .options({ url: `${url}/page/` })
                            .title('Preview')
                            .icon(EyeIcon),
                        ])
                    )
                ),
            ])
        ),
    ]);
