import React, { useEffect, useState } from 'react';
import Preview from './parts/preview';

const fetchID = async (url) => {
  const response = await fetch('https://api.netlify.com/api/v1/sites', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.SANITY_STUDIO_NETLIFY_TOKEN}`
    }
  });
  
  if (response.ok) {
    const data = await response.json();

    for (const item of data) {
      if (item.url.replace('http://', 'https://') === url) {
        return item.id;
      }
    }

    return null;
  } else {
    console.error(`Error: ${response.status}`);
  }
}

const checkStatus = async (id) => {
  const response = await fetch(`https://api.netlify.com/api/v1/sites/${id}/deploys?per_page=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.SANITY_STUDIO_NETLIFY_TOKEN}`
    }
  });
  
  if (response.ok) {
    const data = await response.json();

    return data[0].state;
  } else {
    console.error(`Error: ${response.status}`);
  }
}

export const PreviewStatus = () => {
  const [previewText, setPreviewText] = useState('Preview ✅');

  useEffect(() => {
    const url = process.env.SANITY_STUDIO_PREVIEW_URL;
    let netlifySiteId;

    const fetchAndSetId = async () => {
      netlifySiteId = await fetchID(url);
    };

    fetchAndSetId();

    const intervalId = setInterval(async () => {
      const status = await checkStatus(netlifySiteId);

      console.log(status);

      if (status === 'ready') {
        setPreviewText('Preview ✅');
      } else if (
        status === 'new' ||
        status === 'enqueued' ||
        status === 'building' ||
        status === 'uploading' ||
        status === 'uploaded' ||
        status === 'preparing' ||
        status === 'prepared' ||
        status === 'processing' ||
        status === 'retrying'
      ) {
        setPreviewText('Preview ⏳');
      } else {
        setPreviewText('Preview ❗️');
      }
    }, 5 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>{previewText}</div>;
};

export const structure = (S, context) => {
  return S.list()
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
                            .options({ url: `${process.env.SANITY_STUDIO_PREVIEW_URL}/page/` })
                            .title(<PreviewStatus />)
                        ])
                    )
                ),
            ])
        ),
    ]);
};
