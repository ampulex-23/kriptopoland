import Document, { Html, Head, Main, NextScript } from 'next/document';

import { AppConfig } from '../utils/AppConfig';

class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <title>{AppConfig.title}</title>
          <meta name="title" content={AppConfig.title} />
          <meta name="description" content={AppConfig.description} />
          {AppConfig.locale === 'ru' && <meta name="robots" content="noindex" />}
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
